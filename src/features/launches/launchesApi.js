export const fetchLaunches = async ({
  page = 1,
  limit = 12,
  upcoming = null,
  success = null,
  dateFilter = null
} = {}) => {
  const query = {};
  if (upcoming !== null) query.upcoming = upcoming;
  if (success !== null) query.success = success;

  if (dateFilter?.value !== 'all') {
    const now = new Date();
    const date = new Date();

  if (
  dateFilter?.value === 'custom' &&
  dateFilter.from &&
  dateFilter.to &&
  !isNaN(new Date(dateFilter.from)) &&
  !isNaN(new Date(dateFilter.to))
) {
const fromISO = new Date(dateFilter.from).toISOString();
const toDate = new Date(dateFilter.to);
toDate.setHours(23, 59, 59, 999); // to cover the full 'to' date
const toISO = toDate.toISOString();

query.date_utc = {
  $gte: fromISO,
  $lte: toISO,
};

}
 else {
      switch (dateFilter?.value) {
        case '1week':
          date.setDate(now.getDate() - 7);
          break;
        case '1month':
          date.setMonth(now.getMonth() - 1);
          break;
        case '3months':
          date.setMonth(now.getMonth() - 3);
          break;
        case '6months':
          date.setMonth(now.getMonth() - 6);
          break;
        case '1year':
          date.setFullYear(now.getFullYear() - 1);
          break;
        case '2years':
          date.setFullYear(now.getFullYear() - 2);
          break;
      }
      query.date_utc = { $gte: date.toISOString() };
    }
  }
  const BASE_URL = import.meta.env.VITE_SPACEX_API;

  const res = await fetch(`${BASE_URL}/launches/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      options: {
        page,
        limit,
        sort: { date_utc: 'desc' },
        populate: [
          { path: 'rocket', select: { name: 1 } },
          { path: 'launchpad', select: { name: 1 } },
          { path: 'payloads', select: { orbit: 1 } },
        ],
      },
    }),
  });

  if (!res.ok) throw new Error('Failed to fetch launches');
  return await res.json();
};
