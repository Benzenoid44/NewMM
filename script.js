let lastSummary = {};

async function proceedTransaction() {
  const name = document.getElementById('donorName').value;
  const amount = document.getElementById('amount').value;

  if (!name || !amount) {
    alert("Please enter both name and amount.");
    return;
  }

  // Simulate MetaMask connection
  let wallet = "Not Connected";
  try {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      wallet = accounts[0];
    } else {
      // Dummy wallet if MetaMask is not installed
      wallet = "0x" + Math.random().toString(16).substr(2, 40);
    }
  } catch (err) {
    alert("❌ Wallet connection failed.");
    return;
  }

  // Show summary
  document.getElementById('sName').innerText = name;
  document.getElementById('sAmount').innerText = amount;
  document.getElementById('sWallet').innerText = wallet;
  document.getElementById('summaryBox').style.display = 'block';

  // Save latest details
  lastSummary = { name, amount, wallet };
}

function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Donation Summary", 20, 20);

  doc.setFontSize(12);
  doc.text(`${lastSummary.name}`, 20, 40);

  doc.text(`Amount: ₹${lastSummary.amount}`, 20, 50);

  doc.text(`Wallet: ${lastSummary.wallet}`, 20, 60);

  doc.text("Status: Transaction Successful", 20, 70);

  doc.text(`Date: ${new Date().toLocaleString()}`, 20, 80);


  doc.save(`Donation_Summary_${lastSummary.name}.pdf`);

}