export const getCSS = async () => `
	body {
		font-family: Arial, Helvetica, sans-serif;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	th, td {
		padding: 6px 4px;
	}

	th {
		text-align: left;
	}

	thead tr {
		border-bottom: 1px solid black;
	}

	thead tr th:last-child {
		width: 50%;
	}

	tbody tr:nth-child(odd) {
		background: #f4f8f9;
	}

	.choices {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.choice {
		color: #aaa;
	}

	.choice.selected {
		color: black;
		font-weight: bold;
	}
`;
