export async function POST(request) {
  try {
    const body = await request.json();
    const { ingredients, flavors, cuisines } = body;
    const MANDRILL_SPICES = ["純カレー粉","純カレー粉辛味抜き","ブラウンマスタードホール","クミンパウダーorホール","ターメリックパウダー","コリアンダーパウダー","パプリカパウダー","ガラムマサラパウダー","オールスパイスパウダー","クローブパウダー","シナモンパウダー","ブラックペッパーパウダー","カルダモンパウダー","ジンジャーパウダー","チリペッパーパウダー","カレフリベーシック","カレフリスパイシー"];
    const parts = [`食材：${ingredients.join("、")}`];
    if (flavors?.length) parts.push(`希望する味：${flavors.join("、")}`);
    if (cuisines?.length) parts.push(`料理ジャンル：${cuisines.join("、")}`);
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return Response.json({ error: "APIキーなし" }, { status: 500 });
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1200,
        system: `あなたはMANDRILL CURRYのスパイス専門家です。必ず以下からのみ選んでください。【ラインナップ】${MANDRILL_SPICES.join("、")}。JSON形式のみで返答:{"combinations":[{"name":"名前","spices":["s1","s2","s3"],"amounts":["小さじ1","小さじ1/2","少々"],"description":"説明2文","difficulty":"簡単|普通|本格的","flavorProfile":"印象10文字以内"}],"tip":"アドバイス"}3つ提案。`,
        messages: [{ role: "user", content: parts.join("\n") }],
      }),
    });
    const data = await res.json();
    if (!res.ok || !data.content) return Response.json({ error: JSON.stringify(data) }, { status: 500 });
    const text = data.content.map(b => b.text || "").join("");
    const clean = text.replace(/```json|```/g, "").trim();
    return Response.json(JSON.parse(clean));
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
