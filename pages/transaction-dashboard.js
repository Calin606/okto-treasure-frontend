import { React, useState, useEffect } from "react";

const TransactionDashoboard = () => {

    const TRANSACTION_URL = "http://localhost:8999/api/simplestorage/transfer";

    const [transaction, setTransaction] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            console.log("HERE")
          setLoading(true);
          try {
            const response = await fetch(TRANSACTION_URL, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            const transactionStatus = await response;
            console.log(transactionStatus);
            setTransaction(transactionStatus);
          } catch (error) {
            console.log(error);
          }
          setLoading(false);
        };
        fetchData();
    }, [transaction]);

    return (<div className="container mx-auto my-8">
        <div className="flex shadow border-b">
            <table className="min-w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="text-left font-medium text-grey-500">Recipient Address</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    <tr>
                        <td className="text-left px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-500">0xfdskmhfjolpsdajfdsbas</div></td>
                        <td className="text-left px-6 py-4 whitespace-nowrap"><a href="#" className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer">Submit</a></td>
                        {/* <div>:Transaction {transaction}</div> */}
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    

    )
};

export default TransactionDashoboard;
