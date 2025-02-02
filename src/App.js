import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // États pour le formulaire de création de transaction
  const [formData, setFormData] = useState({
    date: '',
    category: '',
    amount: '',
  });

  // États pour la liste des transactions
  const [transactions, setTransactions] = useState([]);

  // État pour l'année de la balance comptable
  const [year, setYear] = useState('');

  // Récupérer les transactions depuis le backend
  useEffect(() => {
    axios.get('http://localhost:8000/api/transactions/')
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des transactions', error);
      });
  }, []);

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/transactions/', formData);
      alert('Transaction créée avec succès !');
      setFormData({ date: '', category: '', amount: '' });
      // Recharger la liste des transactions après création
      const response = await axios.get('http://localhost:8000/api/transactions/');
      setTransactions(response.data);
    } catch (error) {
      console.error('Erreur lors de la création de la transaction', error);
    }
  };

  // Gérer le téléchargement de la balance comptable
  const handleDownloadBalance = async () => {
    if (!year) {
      alert('Veuillez saisir une année valide.');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8000/api/balance/${year}/`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `balance_${year}.csv`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Erreur lors du téléchargement de la balance', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gestion des transactions</h1>

      {/* Formulaire de création de transaction */}
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">Créer une transaction</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Date :</label>
              <input
                type="date"
                className="form-control"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Catégorie :</label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="">Sélectionnez une catégorie</option>
                <option value="Ventes">Ventes</option>
                <option value="Achats">Achats</option>
                <option value="Salaires">Salaires</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Montant :</label>
              <input
                type="number"
                className="form-control"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Créer</button>
          </form>
        </div>
      </div>

      {/* Liste des transactions */}
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">Liste des transactions</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>Catégorie</th>
                <th>Montant</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>{transaction.date}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Générer la balance comptable */}
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Générer la balance comptable</h2>
          <div className="mb-3">
            <label className="form-label">Année :</label>
            <input
              type="number"
              className="form-control"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </div>
          <button onClick={handleDownloadBalance} className="btn btn-success">
            Télécharger la balance
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;