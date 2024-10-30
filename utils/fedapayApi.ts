import axios from 'axios';


const API_URL = `${process.env.EXPO_PUBLIC_FEDAPAY_API_URL}`;
const API_KEY = `${process.env.EXPO_PUBLIC_FEDAPAY_API_KEY}`;

/**
 * Vérifie que la clé API est définie
 */
if (!API_KEY) {
    throw new Error("La clé API FedaPay n'est pas définie dans les variables d'environnement.");
  }

  /**
 * Configuration de l'instance Axios pour FedaPay
 */
const fedapayApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`, 
    'Content-Type': 'application/json'
  }
});

/**
 * Crée une transaction via l'API FedaPay
 * @param transactionData Données de la transaction
 * @returns Les données de la transaction créée
 */
export const createTransaction = async (transactionData) => {
  try {
    const response = await fedapayApi.post('/transactions', transactionData);
    return response.data['v1/transaction']; // Return the nested transaction object
  } catch (error) {
    console.error('Erreur lors de la création de la transaction:', error.response?.data || error.message);
    throw error;
  }
}; 

/**
 * Génère un token pour une transaction via l'API FedaPay
 * @param transactionId ID de la transaction
 * @returns Les données du token
 */
export const generateToken = async (transactionId: string) => {
  try {
    const response = await fedapayApi.post(`/transactions/${transactionId}/token`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la génération du token:', error.response?.data || error.message);
    throw error;
  }
};


/**
 * Récupère les détails d'une transaction via l'API FedaPay
 * @param transactionId ID de la transaction
 * @returns Les détails de la transaction
 */
export const fetchTransactionDetails = async (transactionId) => {
    try {
      const response = await fedapayApi.get(`/transactions/${transactionId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de la transaction:', error.response?.data || error.message);
      throw error;
    }
  };