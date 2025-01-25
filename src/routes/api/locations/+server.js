export async function GET({ platform }) {
  const db = platform.env.D1_DATABASE;

  // データベースから最新の位置情報を取得
  const result = await db.prepare('SELECT * FROM locations ORDER BY timestamp DESC LIMIT 10').all();

  return new Response(JSON.stringify(result.results), { status: 200 });
}
