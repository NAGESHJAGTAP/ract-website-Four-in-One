import React, { useState, useEffect } from "react";

function Bank() {
  const [banks, setBanks] = useState([]); // Bank details
  const [search, setSearch] = useState({
    bankName: "",
    city: "",
    district: "",
    branch: "",
  });
  const [districts, setDistricts] = useState([
    "Mumbai",
    "Pune",
    "Delhi",
    "Chennai",
    "Kolkata",
  ]); // List of districts (static, could be dynamic if needed)
  const [cities, setCities] = useState([]); // List of cities (dynamically fetched)
  const [branches, setBranches] = useState([]); // List of branches
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message state

  // Mock Bank Names
  const bankNames = ["SBI", "HDFC", "ICICI", "Axis", "Bank of Baroda"]; // Replace with API if available

  // Fetch branches automatically when bankName and city are selected
  useEffect(() => {
    const fetchBranches = async () => {
      if (!search.bankName || !search.city) {
        setBranches([]);
        return;
      }

      setLoading(true);
      setError("");
      try {
        // API for branch data (replace with actual data source if needed)
        const response = await fetch(
          `https://ifsc.razorpay.com/${search.bankName}/${search.city}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch branch data.");
        }
        const data = await response.json();
        setBranches(data || []); // Assuming the data structure
      } catch (err) {
        console.error("Error fetching branch data:", err);
        setError("No branches found for the selected bank and city.");
        setBranches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, [search.bankName, search.city]); // Trigger fetch when bankName or city changes

  // Fetch bank details for a specific branch
  const fetchBankData = async () => {
    if (!search.branch) {
      setError("Please select a branch.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://ifsc.razorpay.com/${search.branch}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch bank data.");
      }
      const data = await response.json();
      setBanks([data]); // Storing the fetched bank in an array for display
    } catch (err) {
      console.error("Error fetching bank data:", err);
      setError("No bank details found for the selected branch.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">
        Indian Bank Finder
      </h1>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md">
        {/* Select Bank */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Select Bank
          </label>
          <select
            value={search.bankName}
            onChange={(e) =>
              setSearch((prev) => ({ ...prev, bankName: e.target.value }))
            }
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Bank</option>
            {bankNames.map((bank) => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </select>
        </div>

        {/* Select District */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Select District
          </label>
          <select
            value={search.district}
            onChange={(e) =>
              setSearch((prev) => ({ ...prev, district: e.target.value }))
            }
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* Select City */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Select City
          </label>
          <input
            type="text"
            placeholder="Enter City (e.g., Mumbai)"
            value={search.city}
            onChange={(e) =>
              setSearch((prev) => ({ ...prev, city: e.target.value }))
            }
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Select Branch */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Select Branch
          </label>
          <select
            value={search.branch}
            onChange={(e) =>
              setSearch((prev) => ({ ...prev, branch: e.target.value }))
            }
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Branch</option>
            {branches.map((branch, index) => (
              <option key={index} value={branch.branch}>
                {branch.branch}
              </option>
            ))}
          </select>
        </div>

        {/* Fetch Bank Data Button */}
        <button
          onClick={fetchBankData}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
        >
          Get Bank Details
        </button>

        {/* Loading State */}
        {loading && <p className="text-center text-gray-600 mt-4">Loading...</p>}

        {/* Error Message */}
        {error && <p className="text-center text-red-600 mt-4">{error}</p>}

        {/* Bank Results */}
        {banks.length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Bank Details
            </h2>
            <ul className="space-y-4">
              {banks.map((bank, index) => (
                <li key={index} className="bg-gray-100 p-4 rounded-md shadow-md">
                  <p className="text-lg font-semibold">{bank.branch}</p>
                  <p className="text-sm text-gray-600">IFSC: {bank.ifsc}</p>
                  <p className="text-sm text-gray-600">Address: {bank.address}</p>
                  <p className="text-sm text-gray-600">
                    District: {bank.district}
                  </p>
                  <p className="text-sm text-gray-600">State: {bank.state}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Bank;
