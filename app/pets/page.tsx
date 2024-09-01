"use client";

import { useState, useEffect } from 'react';
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

export default function PetsPage() {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [addingPet, setAddingPet] = useState(false);
  const [totalRecords, setTotalRecords] = useState<number | null>(null);

  const fetchPets = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/pets-api/get-pets');
      if (!response.ok) {
        throw new Error('Failed to fetch pets');
      }
      const data = await response.json();
      setPets(data.pets);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalRecords = async () => {
    try {
      const response = await fetch('/api/pets-api/get-total-pets');
      if (!response.ok) {
        throw new Error('Failed to fetch total records');
      }
      const data = await response.json();
      setTotalRecords(data.total);
    } catch (err) {
      console.error('Error fetching total records:', err);
    }
  };

  useEffect(() => {
    fetchTotalRecords();
  }, []);

  const handleAddPet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAddingPet(true);
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const petName = formData.get('petName') as string;
    const ownerName = formData.get('ownerName') as string;

    try {
      const response = await fetch('/api/pets-api/add-pet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: petName, owner: ownerName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add pet');
      }

      // Clear form fields
      form.reset();
      // Refresh the pet list and total records after adding a new pet
      await Promise.all([fetchPets(), fetchTotalRecords()]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setAddingPet(false);
    }
  };

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Create Pets Table</h2>
        <form action="/api/pets-api/create-pets-table" method="get">
          <Button type="submit" color="primary">Create Table</Button>
        </form>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add a Pet</h2>
        <form onSubmit={handleAddPet} className="flex flex-col gap-2">
          <Input type="text" name="petName" placeholder="Pet Name" required />
          <Input type="text" name="ownerName" placeholder="Owner Name" required />
          <Button type="submit" color="success" isLoading={addingPet}>
            {addingPet ? 'Adding...' : 'Add Pet'}
          </Button>
        </form>
        {error && <p className="text-red-500 mt-2">Error: {error}</p>}
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Pets List</h2>
        <Button 
          onClick={fetchPets} 
          color="secondary"
          isLoading={loading}
        >
          {loading ? 'Fetching...' : 'Fetch Pets'}
        </Button>
        
        {totalRecords !== null && (
          <p className="mt-2">Total records in Pets table: {totalRecords}</p>
        )}
        
        {pets.length > 0 && (
          <ul className="list-disc pl-5 mt-4">
            {pets.map((pet: { id: string; name: string; owner: string }) => (
              <li key={pet.id} className="mb-1">
                {Object.entries(pet).map(([key, value]) => (
                  <span key={key} className="mr-2">
                    {key}: {value}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        )}
        
        {pets.length === 0 && !loading && !error && (
          <p className="text-gray-500 mt-2">No pets found. Click the button to fetch pets.</p>
        )}
      </div>
    </>
  );
}