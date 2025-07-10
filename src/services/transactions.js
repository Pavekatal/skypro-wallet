// Получить транзакции за период
export async function getTransactionsPeriod({ start, end }) {
  try {
    const userInfo = window.localStorage.getItem("userInfo") ? JSON.parse(window.localStorage.getItem("userInfo")) : null;
    const token = userInfo?.token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await fetch(
      "https://wedev-api.sky.pro/api/transactions/period",
      {
        method: "POST",
        headers,
        body: JSON.stringify({ start, end })
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || response.statusText);
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
} 