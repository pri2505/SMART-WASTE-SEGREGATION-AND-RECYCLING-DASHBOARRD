const bins = [
  {id:"BIN-104", location:"Central Market", area:"Zone A · Main road", type:"Organic", color:"#18a77b", fill:98, updated:"4 min ago"},
  {id:"BIN-087", location:"Bus Terminal", area:"Zone B · Transit hub", type:"General", color:"#f4b544", fill:92, updated:"12 min ago"},
  {id:"BIN-216", location:"Lake Road", area:"Zone C · Lakeside", type:"Recyclable", color:"#4c85ee", fill:89, updated:"19 min ago"},
  {id:"BIN-031", location:"City Hospital", area:"Zone A · Public facility", type:"Hazardous", color:"#9a7aea", fill:64, updated:"3 min ago"},
  {id:"BIN-152", location:"Green Park", area:"Zone B · Public park", type:"Organic", color:"#18a77b", fill:47, updated:"6 min ago"},
  {id:"BIN-203", location:"Industrial Estate", area:"Zone D · Industrial", type:"Recyclable", color:"#4c85ee", fill:28, updated:"8 min ago"}
];
function statusFor(fill){return fill>=90?"Critical":fill>=80?"Needs pickup":"Normal"}
function renderBins(){
  const query=(document.getElementById("searchInput").value||"").toLowerCase().trim();
  const filter=document.getElementById("statusFilter").value;
  const rows=bins.filter(b=>(b.id+" "+b.location+" "+b.type).toLowerCase().includes(query)&&(filter==="all"||statusFor(b.fill)===filter));
  document.getElementById("binRows").innerHTML=rows.map(b=>{
    const status=statusFor(b.fill), level=b.fill>=90?"fill-critical":b.fill>=80?"fill-high":"fill-normal";
    return `<tr><td><span class="bin-id">${b.id}</span></td><td><div class="location-name">${b.location}</div><div class="location-area">${b.area}</div></td><td><span class="waste-type"><i class="type-dot" style="background:${b.color}"></i>${b.type}</span></td><td class="fill-cell"><div class="fill-line"><div class="fill-track"><span class="${level}" style="width:${b.fill}%"></span></div><span class="fill-num">${b.fill}%</span></div></td><td><span class="status-pill ${status.replace(" ","-")}">${status}</span></td><td>${b.updated}</td></tr>`;
  }).join("") || `<tr><td colspan="6" style="text-align:center;color:#8a97a6;padding:25px">No matching bins found.</td></tr>`;
  document.getElementById("rowCount").textContent=`Showing ${rows.length} of ${bins.length} demo bins`;
}
function showToast(message){
 const toast=document.getElementById("toast");toast.textContent=message;toast.classList.add("show");
 clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove("show"),2800);
}
document.getElementById("searchInput").addEventListener("input",renderBins);
document.getElementById("statusFilter").addEventListener("change",renderBins);
document.getElementById("periodSelect").addEventListener("change",e=>{
 const month=e.target.value==="month";
 document.querySelector(".donut-center strong").textContent=month?"24.6t":"6.42t";
 document.getElementById("organicValue").textContent=month?"39%":"42%";
 document.getElementById("recyclableValue").textContent=month?"34%":"31%";
 document.getElementById("generalValue").textContent=month?"20%":"19%";
 document.getElementById("hazardousValue").textContent=month?"7%":"8%";
 document.getElementById("donut").style.background=month?"conic-gradient(#18a77b 0 39%,#4c85ee 39% 73%,#f4b544 73% 93%,#9a7aea 93% 100%)":"conic-gradient(#18a77b 0 42%,#4c85ee 42% 73%,#f4b544 73% 92%,#9a7aea 92% 100%)";
});
document.getElementById("reportBtn").addEventListener("click",()=>{
 const csv=[["Bin ID","Location","Waste type","Fill level","Status","Last updated"],...bins.map(b=>[b.id,b.location,b.type,b.fill+"%",statusFor(b.fill),b.updated])].map(r=>r.map(v=>`"${String(v).replaceAll('"','""')}"`).join(",")).join("\n");
 const blob=new Blob([csv],{type:"text/csv;charset=utf-8;"}),url=URL.createObjectURL(blob),a=document.createElement("a");
 a.href=url;a.download="wasteops-bin-report.csv";a.click();URL.revokeObjectURL(url);showToast("Demo CSV report exported.");
});
document.getElementById("viewBinsBtn").addEventListener("click",()=>{document.getElementById("bins").scrollIntoView({behavior:"smooth"});document.getElementById("statusFilter").value="Critical";renderBins();});
document.getElementById("menuBtn").addEventListener("click",()=>document.getElementById("sidebar").classList.toggle("open"));
document.querySelectorAll(".nav-link").forEach(link=>link.addEventListener("click",()=>{document.querySelectorAll(".nav-link").forEach(n=>n.classList.remove("active"));link.classList.add("active");document.getElementById("sidebar").classList.remove("open");}));
renderBins();
