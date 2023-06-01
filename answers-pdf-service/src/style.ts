export const getCSS = async () => `
body {
  padding: 5% 10% 5% 10%;
  font-family: Arial, sans-serif;
  position: relative;
  counter-reset: page;
}
.header {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}
.company-logo {
  max-height: 50px;
}
.question-wrapper {
  display: flex;
  align-items: center;
}
.label-container {
  flex: 1;
  min-width: 150px;
}
.input-container {}
.choice-wrapper {
  align-items: center;
  margin-right: 10px;
}
.informational-wrapper {
  margin-bottom: 10px;
}
.grid-wrapper {
  width: 100%;
}
table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 10px;
}
td, th {
  border: 1px solid #444;
  text-align: center;
  padding: 5px;
}
.footer {
  display: flex;
  justify-content: center;
  padding: 20px 0;
  position: absolute;
  bottom: 0;
  width: 100%;
}
.page-number {
  font-weight: bold;
}
hr {
  margin-top: 20px;
  margin-bottom: 20px;
}
.footer::after {
  content: "Page " counter(page);
  counter-increment: page;
}
`;
