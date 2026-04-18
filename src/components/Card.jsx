 export default function Card({ children, style = {}, onClick }) {
return (
<div
onClick={onClick}
style={{
background: "#fff",
borderRadius: "16px",
padding: "16px",
boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
border: "1px solid #eee",
cursor: onClick ? "pointer" : "default",
transition: "0.2s",
...style,
}}
>
{children} </div>
);
}
