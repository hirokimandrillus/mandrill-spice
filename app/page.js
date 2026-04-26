'use client';
import { useState } from "react";

const MANDRILL_SPICES = [
  "純カレー粉","純カレー粉辛味抜き","ブラウンマスタードホール",
  "クミンパウダーorホール","ターメリックパウダー","コリアンダーパウダー",
  "パプリカパウダー","ガラムマサラパウダー","オールスパイスパウダー",
  "クローブパウダー","シナモンパウダー","ブラックペッパーパウダー",
  "カルダモンパウダー","ジンジャーパウダー","チリペッパーパウダー",
  "カレフリベーシック","カレフリスパイシー",
];

const FLAVORS = [
  {label:"辛い",emoji:"🔥"},{label:"甘い",emoji:"🍯"},{label:"酸っぱい",emoji:"🍋"},
  {label:"香ばしい",emoji:"🌰"},{label:"さっぱり",emoji:"💨"},{label:"コク深い",emoji:"👑"},
  {label:"フルーティ",emoji:"🍑"},{label:"スモーキー",emoji:"🌫️"},
];

const CUISINES = [
  {label:"和風",emoji:"🍱"},{label:"洋風",emoji:"🍝"},{label:"中華",emoji:"🥢"},
  {label:"韓国風",emoji:"🌶️"},{label:"インド",emoji:"🫙"},{label:"中東",emoji:"🫓"},
  {label:"メキシカン",emoji:"🌮"},{label:"タイ・東南アジア",emoji:"🌿"},{label:"地中海",emoji:"🫒"},
];

const ACCENT = ["#E53935","#4FC3F7","#FFD600"];
const DIFFICULTY = {
  "簡単":{bg:"#E8F5E9",color:"#2E7D32",border:"#2E7D32"},
  "普通":{bg:"#FFF8E1",color:"#E65100",border:"#E65100"},
  "本格的":{bg:"#FFEBEE",color:"#C62828",border:"#C62828"},
};

function Chip({ label, emoji, selected, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: selected ? "#FFD600" : "#fff",
      border: "2.5px solid #111", padding: "8px 14px", color: "#111",
      fontSize: "13px", fontWeight: selected ? "900" : "700", cursor: "pointer",
      display: "flex", alignItems: "center", gap: "6px",
      fontFamily: "'Arial Black', Arial, sans-serif",
      boxShadow: selected ? "3px 3px 0 #111" : "2px 2px 0 #bbb",
      transform: selected ? "translate(-1px,-1px)" : "none", transition: "all 0.1s",
    }}>
      {emoji} {label}
    </button>
  );
}

function Section({ num, title, sub, children }) {
  return (
    <div style={{ background:"#fff", border:"2.5px solid #111", padding:"22px", marginBottom:"16px", boxShadow:"5px 5px 0 #111" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"14px", flexWrap:"wrap" }}>
        <span style={{ background:"#111", color:"#FFD600", fontFamily:"'Arial Black',Arial,sans-serif", fontWeight:"900", fontSize:"16px", padding:"3px 10px" }}>{num}</span>
        <span style={{ fontFamily:"'Arial Black',Arial,sans-serif", fontWeight:"900", fontSize:"14px", color:"#111", textTransform:"uppercase", letterSpacing:"0.05em" }}>{title}</span>
        {sub && <span style={{ fontSize:"11px", color:"#999" }}>{sub}</span>}
      </div>
      {children}
    </div>
  );
}

export default function Home() {
  const [input, setInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [flavors, setFlavors] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addIng = () => {
    const v = input.trim();
    if (v && !ingredients.includes(v)) { setIngredients([...ingredients, v]); setInput(""); }
  };
  const toggle = (arr, setArr, v) =>
    setArr(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);

  const getSuggestions = async () => {
    setLoading(true); setResult(null); setError(null);
    try {
      const res = await fetch("/api/spice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients, flavors, cuisines }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); } else { setResult(data); }
    } catch(e) {
      setError("エラーが発生しました。もう一度お試しください。");
    }
    setLoading(false);
  };

  const usedSpices = result?.combinations?.flatMap(c => c.spices) || [];
  const canSearch = ingredients.length > 0 && !loading;

  return (
    <div style={{ minHeight:"100vh", background:"#F5F5F0", fontFamily:"Arial,sans-serif" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: #aaa; }
        input:focus { outline: 3px solid #FFD600 !important; }
        button:active { opacity: 0.85; }
      `}</style>

      {/* Header */}
      <div style={{ background:"#111", borderBottom:"4px solid #FFD600" }}>
        <div style={{ maxWidth:"680px", margin:"0 auto", padding:"16px 20px", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <img src="/ロゴ.png" alt="MANDRILL" style={{ height:"80px", width:"auto" }} />
        </div>
      </div>
      <div style={{ background:"#FFD600", height:"6px", borderBottom:"2.5px solid #111" }} />

      <div style={{ maxWidth:"680px", margin:"0 auto", padding:"24px 16px" }}>

        {/* Hero */}
        <div style={{ marginBottom:"24px", fontFamily:"'Arial Black',Arial,sans-serif", fontWeight:"900", fontSize:"clamp(20px,5vw,32px)", color:"#111", lineHeight:1.2 }}>
          食材から<br/>
          <span style={{ background:"#E53935", color:"#fff", padding:"2px 8px", display:"inline-block", marginTop:"4px" }}>MANDRILLスパイス</span>{" "}
          <span style={{ background:"#FFD600", color:"#111", padding:"2px 8px" }}>を発見する</span>
        </div>

        {/* 食材 */}
        <Section num="01" title="食材を追加">
          <div style={{ display:"flex", gap:"8px" }}>
            <input value={input} onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&addIng()}
              placeholder="例：鶏肉、トマト…"
              style={{ flex:1, border:"2.5px solid #111", padding:"12px 14px", fontSize:"16px", fontFamily:"Arial,sans-serif", outline:"none", background:"#fff", color:"#111", WebkitAppearance:"none", borderRadius:"0" }}
            />
            <button onClick={addIng} style={{ background:"#FFD600", border:"2.5px solid #111", padding:"12px 18px", fontFamily:"'Arial Black',Arial,sans-serif", fontWeight:"900", fontSize:"22px", cursor:"pointer", boxShadow:"3px 3px 0 #111", color:"#111", borderRadius:"0" }}>＋</button>
          </div>
          {ingredients.length > 0 && (
            <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", marginTop:"12px" }}>
              {ingredients.map((ing,i) => (
                <span key={i} style={{ background:"#111", color:"#fff", padding:"6px 14px", fontSize:"13px", fontWeight:"700", fontFamily:"'Arial Black',Arial,sans-serif", display:"flex", alignItems:"center", gap:"8px" }}>
                  {ing}
                  <span onClick={()=>setIngredients(ingredients.filter((_,idx)=>idx!==i))} style={{ cursor:"pointer", color:"#FFD600", fontWeight:"900", fontSize:"18px", lineHeight:1 }}>×</span>
                </span>
              ))}
            </div>
          )}
        </Section>

        {/* 味 */}
        <Section num="02" title="味の方向" sub="任意・複数OK">
          <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
            {FLAVORS.map(({label,emoji})=>(
              <Chip key={label} label={label} emoji={emoji} selected={flavors.includes(label)} onClick={()=>toggle(flavors,setFlavors,label)} />
            ))}
          </div>
        </Section>

        {/* ジャンル */}
        <Section num="03" title="料理ジャンル" sub="任意・複数OK">
          <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
            {CUISINES.map(({label,emoji})=>(
              <Chip key={label} label={label} emoji={emoji} selected={cuisines.includes(label)} onClick={()=>toggle(cuisines,setCuisines,label)} />
            ))}
          </div>
        </Section>

        {/* ボタン */}
        <button onClick={getSuggestions} disabled={!canSearch} style={{
          width:"100%", padding:"18px",
          background: canSearch ? "#E53935" : "#ccc",
          border:"2.5px solid #111", color:"#fff",
          fontFamily:"'Arial Black',Arial,sans-serif", fontWeight:"900", fontSize:"16px",
          letterSpacing:"0.08em", textTransform:"uppercase",
          cursor: canSearch ? "pointer" : "not-allowed",
          boxShadow: canSearch ? "5px 5px 0 #111" : "none",
          marginBottom:"28px", transition:"all 0.1s", borderRadius:"0",
        }}>
          {loading ? "👑 考案中…" : "🌶 スパイスを提案してもらう"}
        </button>

        {error && <div style={{ background:"#FFEBEE", border:"2.5px solid #E53935", padding:"16px", color:"#C62828", fontWeight:"700", textAlign:"center", marginBottom:"24px" }}>{error}</div>}

        {result && (
          <div>
            {result.tip && (
              <div style={{ background:"#FFD600", border:"2.5px solid #111", padding:"14px 18px", marginBottom:"20px", boxShadow:"4px 4px 0 #111", fontSize:"14px", fontWeight:"700", color:"#111", lineHeight:"1.6" }}>
                👑 {result.tip}
              </div>
            )}
            <div style={{ display:"flex", flexDirection:"column", gap:"16px", marginBottom:"28px" }}>
              {result.combinations?.map((combo,i) => {
                const ds = DIFFICULTY[combo.difficulty] || DIFFICULTY["普通"];
                return (
                  <div key={i} style={{ background:"#fff", border:"2.5px solid #111", borderLeft:`8px solid ${ACCENT[i%3]}`, padding:"20px", boxShadow:"5px 5px 0 #111" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"12px", flexWrap:"wrap", gap:"8px" }}>
                      <div>
                        <div style={{ fontFamily:"'Arial Black',Arial,sans-serif", fontWeight:"900", fontSize:"16px", color:"#111" }}>{combo.name}</div>
                        {combo.flavorProfile && <div style={{ fontSize:"12px", color:"#666", marginTop:"3px", fontWeight:"600" }}>✦ {combo.flavorProfile}</div>}
                      </div>
                      <span style={{ background:ds.bg, border:`2px solid ${ds.border}`, color:ds.color, padding:"3px 10px", fontSize:"11px", fontWeight:"900", fontFamily:"'Arial Black',Arial,sans-serif" }}>{combo.difficulty}</span>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:"6px", marginBottom:"12px" }}>
                      {combo.spices?.map((spice,j) => (
                        <div key={j} style={{ display:"flex", alignItems:"center", gap:"10px", flexWrap:"wrap" }}>
                          <span style={{ background:"#111", color:"#FFD600", padding:"4px 12px", fontSize:"12px", fontWeight:"700" }}>{spice}</span>
                          {combo.amounts?.[j] && <span style={{ fontSize:"12px", color:"#666", fontWeight:"600" }}>{combo.amounts[j]}</span>}
                        </div>
                      ))}
                    </div>
                    <p style={{ margin:0, fontSize:"14px", color:"#444", lineHeight:"1.7" }}>{combo.description}</p>
                  </div>
                );
              })}
            </div>

            {/* 全ラインナップ */}
            <div style={{ background:"#111", border:"2.5px solid #111", padding:"20px", boxShadow:"5px 5px 0 #FFD600", marginBottom:"28px" }}>
              <div style={{ fontFamily:"'Arial Black',Arial,sans-serif", fontWeight:"900", fontSize:"11px", color:"#FFD600", letterSpacing:"0.15em", marginBottom:"14px", textTransform:"uppercase" }}>
                CUSTOM BLEND LOG — MANDRILLスパイス全ラインナップ
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
                {MANDRILL_SPICES.map(spice => {
                  const used = usedSpices.includes(spice);
                  return (
                    <div key={spice} style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                      <span style={{ width:"8px", height:"8px", borderRadius:"50%", background: used ? "#FFD600" : "#444", flexShrink:0 }} />
                      <span style={{ fontSize:"13px", color: used ? "#FFD600" : "#888", fontWeight: used ? 700 : 400 }}>{spice}</span>
                      {used && <span style={{ fontSize:"10px", color:"#111", background:"#FFD600", padding:"1px 7px", fontWeight:"900", fontFamily:"'Arial Black',Arial,sans-serif" }}>使用</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop:"40px", borderTop:"2.5px solid #111", paddingTop:"20px", textAlign:"center" }}>
          <div style={{ fontFamily:"'Arial Black',Arial,sans-serif", fontWeight:"900", fontSize:"12px", color:"#111", letterSpacing:"0.15em", marginBottom:"16px" }}>
            MANDRILL™ — CHOICE IS YOURS
          </div>
          <a href="https://item.rakuten.co.jp/mandrill/md0080/" target="_blank" rel="noopener noreferrer" style={{
            display:"inline-block",
            background:"#BF0000",
            color:"#fff",
            fontFamily:"'Arial Black',Arial,sans-serif",
            fontWeight:"900",
            fontSize:"14px",
            padding:"14px 28px",
            border:"2.5px solid #111",
            boxShadow:"4px 4px 0 #111",
            textDecoration:"none",
            letterSpacing:"0.08em",
          }}>
            🛒 楽天でスパイスを購入する
          </a>
        </div>

      </div>
    </div>
  );
}
