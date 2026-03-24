import { useEffect, useState } from "react";

import { getLeads } from "../services/api";

import Filters from "../components/Filters";
import Stats from "../components/Stats";
import LeadTable from "../components/LeadTable";

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    const res = await getLeads();
    setLeads(res.data);
    setFilteredLeads(res.data);
  };

  const handleFilter = (filters) => {
    let result = leads;

    if (filters.category) {
      result = result.filter((l) =>
        l.category?.toLowerCase().includes(filters.category.toLowerCase()),
      );
    }

    if (filters.location) {
      result = result.filter((l) =>
        l.address?.toLowerCase().includes(filters.location.toLowerCase()),
      );
    }

    if (filters.score) {
      result = result.filter((l) => l.leadScore === filters.score);
    }

    if (filters.search) {
      result = result.filter((l) =>
        l.name?.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }

    setFilteredLeads(result);
  };

  return (
    <div className="container mt-4">
      <Filters onFilter={handleFilter} />

      <Stats leads={filteredLeads} />

      <LeadTable leads={filteredLeads} />
    </div>
  );
}
