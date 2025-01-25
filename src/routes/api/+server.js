export async function POST({ request }) {
    try {
        // TTNから送信されたデータを取得
        const data = await request.json();
        console.log('Received data:', data);

        // 必要な処理（例: データのデータベース保存）
        return new Response(JSON.stringify({ status: 'success' }), { status: 200 });
    } catch (error) {
        console.error('Error handling webhook:', error);
        return new Response(JSON.stringify({ status: 'error', message: error.message }), { status: 500 });
    }
}

export async function GET() {
    return new Response('GET method is not supported', { status: 405 });
}
