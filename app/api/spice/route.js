export async function POST(request) {
  const body = await request.json();
  const { ingredients, flavors, cuisines } = body;

  const MANDRILL_SPICES = [
    "純カレー粉","純カレー粉辛味抜き","ブラウンマスタードホール",
    "クミンパウダーorホール","ターメリックパウダー","コリアンダーパウダー",
    "パプリカパウダー","ガラムマサラパウダー","オールスパイスパウダー",
    "クローブパウダー","シナモンパウダー","ブラックペッパーパウダー",
    "カルダモンパウダー","ジンジャーパウダー","チリペッパーパウダー",
    "カレフリベーシック","カレフリスパイシー",
  ];

  const parts = [`食材：${ingredients.join("、")}`];
  if (flavors?.length) parts.push(`希望する味：${flavors.join("、")}`);
  if (cuisines?.length) parts.push(`料理ジャンル：${cuisines.join("、")}`);

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1200,
      system: `あなたはMANDRILL CURRYのスパイス専門家です。必ず以下のMANDRILLラインナップの中からのみスパイスを選んでください。
【ラインナップ】${MANDRILL_SPICES.join("、")}
以下のJSON形式のみで返答してください（バッククォート不要）:
{"combinations":[{"name":"名前","spices":["スパイス1","スパイス2","スパイス3"],"amounts":["小さじ1","小さじ1/2","少々"],"description":"特徴と使い方2文","difficulty":"簡単|普通|本格的","flavorProfile":"味の印象10文字以内"}],"tip":"一言アドバイス"}
3つ提案してください。`,
      messages: [{ role: "user", content: parts.join("\n") }],
    }),
  });

  const data = await res.json();
  const text = data.content.map(b => b.text || "").join("");
  const clean = text.replace(/```json|```/g, "").trim();
  const result = JSON.parse(clean);

  return Response.json(result);
}
