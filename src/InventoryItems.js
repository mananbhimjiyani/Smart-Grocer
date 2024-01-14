import React, { useState, useEffect } from "react";

function InventoryItems() {
    const [Item_MRP, set_Item_MRP] = useState(0);
    const [Item_Weight, set_Item_Weight] = useState(0);
    const [total, setTotal] = useState(0);
    const [users, setUsers] = useState([]);
    const [Item_Identifier, set_Item_Identifier] = useState("");
    const [updateIndex, setUpdateIndex] = useState(null);

    useEffect(() => {
        // Fetch inventory data from the server when the component mounts
        fetchInventoryData();
    }, []); // Dependency array removed

    const fetchInventoryData = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/inventory");
            console.log("Response from server:", response);
            const data = await response.json();
            console.log("Data received from server:", data);
            setUsers(data);
        } catch (error) {
            console.error("Error fetching inventory data:", error);
        }
    };

    const Calculation = async () => {
        if (!Item_Identifier || !Item_MRP || !Item_Weight) {
            alert("Please fill in all required fields.");
            return;
        }

        const requestData = {
            Item_Identifier,
            Item_Weight,
            Item_MRP,
        };

        const requestOptions = {
            method: updateIndex !== null ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        };

        try {
            const response = await fetch("http://127.0.0.1:5000/inventoryAddOrUpdate", requestOptions);
            console.log("Response from server:", response);
            const data = await response.json();
            console.log("Data received from server:", data);
            setUsers(data);
        } catch (error) {
            console.error("Error updating inventory data:", error);
        }

        // Clear input fields after calculation
        set_Item_Identifier("");
        set_Item_Weight(0);
        set_Item_MRP(0);
        setUpdateIndex(null);
    };

    useEffect(() => {
        // Calculate total after state is updated
        const newTotal = users.reduce((acc, user) => acc + Number(user.Item_MRP) * Number(user.Item_Weight), 0);
        setTotal(newTotal);
    }, [users]);

    const handleUpdate = (index) => {
        // Set the values of the selected item for update
        const selectedItem = users[index];
        set_Item_Identifier(selectedItem.Item_Identifier);
        set_Item_Weight(selectedItem.Item_Weight);
        set_Item_MRP(selectedItem.Item_MRP);
        setUpdateIndex(index);
    };

    return (
        <div className={"container"} style={{ maxHeight: "500px", overflowY: "auto" }}>
            <div className="container-fluid bg-2 text-center">
                <h1>Inventory Management System React</h1>
                <br />
                <div className="row">
                    <div className="col-sm-8">
                        <table className="table table-bordered">
                            <h3 align="left"> Add Products </h3>
                            <tr>
                                <th>Product Name</th>
                                <th>Item MRP</th>
                                <th>Item Weight</th>
                                <th>Option</th>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Item Name"
                                        value={Item_Identifier}
                                        onChange={(event) => {
                                            set_Item_Identifier(event.target.value);
                                        }}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="form-control"
                                        placeholder="Enter Item_MRP"
                                        value={Item_MRP}
                                        onChange={(e) => set_Item_MRP(parseFloat(e.target.value) || 0)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="form-control"
                                        placeholder="Enter Item_Weight"
                                        value={Item_Weight}
                                        onChange={(e) => set_Item_Weight(parseFloat(e.target.value) || 0)}
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
                                <th>Item_MRP</th>
                                <th>Item_Weight</th>
                                <th>Options</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.Item_Identifier}</td>
                                    <td>{row.Item_MRP}</td>
                                    <td>{row.Item_Weight}</td>
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
                </div>
            </div>
        </div>
    );
}

export default InventoryItems;
