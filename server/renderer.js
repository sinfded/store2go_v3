const { ipcRenderer: ipc } = require("electron");

const data = [
  {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: "SAMPLE HEADING",
    style: { fontWeight: "700", textAlign: "center", fontSize: "24px" },
  },
];

function printData() {
  const data = document.querySelector("#printInput").value;
  console.log(data);
  ipc.send("print", {});
}
