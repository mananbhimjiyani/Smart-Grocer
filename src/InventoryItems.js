import {useState, useEffect} from "react";

function InventoryItems() {
    const [price, setPrice] = useState(0);
    const [qty, setQty] = useState(0);
    const [total, setTotal] = useState(0);
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [sum, setSum] = useState("");
    const [updateIndex, setUpdateIndex] = useState(null);

    useEffect(() => {
        // Fetch inventory data from the server when the component mounts
        fetchInventoryData();
    }, []); // Dependency array removed

    const fetchInventoryData = async () => {
        try {
            const response = await fetch("http://localhost:3001/inventory");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching inventory data:", error);
        }
    };

    const Calculation = () => {
        if (!name || !price || !qty) {
            alert("Please fill in all required fields.");
            return;
        }

        // Update the state using a callback to ensure the correct updated state
        setUsers((prevUsers) => {
            if (updateIndex !== null) {
                // Update the existing item
                const updatedUsers = [...prevUsers];
                updatedUsers[updateIndex] = {name, qty, price, sum};
                return updatedUsers;
            } else {
                // Add a new item
                return [...prevUsers, {name, qty, price, sum}];
            }
        });
    };

    useEffect(() => {
        // Calculate total after state is updated
        const newTotal = users.reduce((acc, user) => acc + Number(user.sum), 0);
        setTotal(newTotal);

        // Send data to the server
        sendDataToServer();
    }, [users]); // useEffect dependency on users

    const handleUpdate = (index) => {
        // Set the values of the selected item for update
        const selectedItem = users[index];
        setName(selectedItem.name);
        setQty(selectedItem.qty);
        setPrice(selectedItem.price);
        setSum(selectedItem.sum);
        setUpdateIndex(index);
    };

// Adjust sendDataToServer function
    const sendDataToServer = async () => {
        try {
            const endpoint = updateIndex !== null ? `http://localhost:3001/inventory/${updateIndex}` : "http://localhost:3001/inventory";
            const method = updateIndex !== null ? "PUT" : "POST";

            console.log("Sending data to:", endpoint);

            const response = await fetch(endpoint, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name, qty, price, sum}),
            });

            console.log("Server response:", response);

            if (response.ok) {
                console.log("Data sent successfully!");
            } else {
                console.error("Failed to send data to the server.");
            }
        } catch (error) {
            console.error("Error sending data to the server:", error);
        }
    };

    const handlePriceChange = (e) => {
        const newPrice = parseFloat(e.target.value);
        if (!isNaN(newPrice)) {
            setPrice(newPrice);
            calculateTotal(newPrice, qty);
        }
    };

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        if (!isNaN(newQuantity)) {
            setQty(newQuantity);
            calculateTotal(price, newQuantity);
        }
    };

    const calculateTotal = (price, qty) => {
        const newTotal = price * qty;
        setSum(newTotal);
    };

    function refreshPage() {
        window.location.reload();
    }

    return (
        <div className={"container"}>
            <div className="container-fluid bg-2 text-center">
                <h1>Inventory Management System React</h1>
                <br/>
                <div className="row">
                    <div className="col-sm-8">
                        <table className="table table-bordered">
                            <h3 align="left"> Add Products </h3>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Amount</th>
                                <th>Option</th>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Item Name"
                                        value={name}
                                        onChange={(event) => {
                                            setName(event.target.value);
                                        }}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Price"
                                        value={price}
                                        onChange={handlePriceChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter Qty"
                                        value={qty}
                                        onChange={handleQuantityChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={sum}
                                        className="form-control"
                                        placeholder="Enter Total"
                                        id="total_cost"
                                        name="total_cost"
                                        disabled
                                    />
                                </td>
                                <td>
                                    <button
                                        className="btn btn-success"
                                        type="submit"
                                        onClick={Calculation}
                                    >
                                        {updateIndex !== null ? "Update" : "Add"}
                                    </button>
                                </td>
                            </tr>
                        </table>
                        <h3 align="left"> Products </h3>
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Amount</th>
                                <th>Options</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.name}</td>
                                    <td>{row.price}</td>
                                    <td>{row.qty}</td>
                                    <td>{row.sum}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleUpdate(index)}
                                        >
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group" align="left">
                            <h3>Total</h3>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Total"
                                required
                                disabled
                                value={total}
                            />
                            <br/>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={refreshPage}
                            >
                                <span>Complete</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InventoryItems;
