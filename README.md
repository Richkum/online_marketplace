# online_marketplace
An online marketplace wedsite
app.get("/", (req, res) => {
  res.send("Hello from Rebase academy!");
});

app.listen(PORT, () => {
  console.log(`Davy's server running at http://localhost:${PORT}/`);
});