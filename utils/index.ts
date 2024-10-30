import { QuerySnapshot, DocumentData } from "firebase/firestore";
import { MenuItem } from "@/interface/types";

/**
 * Classe utilitaire pour la gestion des erreurs et autres fonctions
 */
export class UtilsHandle {
  /**
   * Gère les erreurs en fonction du code d'erreur et affiche un message personnalisé
   * @param error L'objet erreur à gérer
   * @param customMessage Message personnalisé pour le contexte de l'erreur
   */
  public handleError(error: any, customMessage: string) {
    console.error(customMessage, error);
    if (error.code) {
      switch (error.code) {
        case "auth/invalid-email":
          console.error(`${customMessage}: Adresse email invalide.`);
          break;
        case "auth/user-disabled":
          console.error(`${customMessage}: Compte utilisateur désactivé.`);
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
          console.error(`${customMessage}: Email ou mot de passe invalide.`);
          break;
        default:
          console.error(`${customMessage}: ${error.message}`);
          break;
      }
    } else {
      console.error(`${customMessage}: ${error.message || error}`);
    }
    throw new Error(customMessage);
  }

  /**
   * Transforme un QuerySnapshot de Firestore en tableau de données typées
   * @param snapshot Snapshot de Firestore
   * @returns Tableau des données
   */
  public mapDocsToData<T>(snapshot: QuerySnapshot<DocumentData>): T[] {
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];
  }
}

/**
 * Ajoute deux nombres en traitant les nombres flottants avec précision
 * @param a Premier nombre
 * @param b Deuxième nombre
 * @returns La somme des deux nombres
 */
export const addFloat = (a: number, b: number): number => {
  return parseFloat((a + b).toFixed(2));
};

/**
 * Soustrait deux nombres en traitant les nombres flottants avec précision
 * @param a Premier nombre
 * @param b Deuxième nombre
 * @returns La différence des deux nombres
 */
export const subtractFloat = (a: number, b: number): number => {
  return parseFloat((a - b).toFixed(2));
};

/**
 * Gère les erreurs dans les thunks Redux
 * @param error L'objet erreur
 * @param rejectWithValue Fonction de rejet du thunk
 * @returns Valeur rejetée avec le message d'erreur
 */
export const handleThunkError = (error: any, rejectWithValue: Function) => {
  console.error("Error occurred:", error);
  return rejectWithValue(error.message || "Une erreur inconnue s'est produite");
};

/**
 * Crée des reducers pour les actions asynchrones Redux
 * @param builder Constructeur de reducers
 * @param action Action asynchrone
 * @param options Options de personnalisation des noms de loading et d'erreur
 */
export const createAsyncReducers = (
  builder: any,
  action: any,
  options = { loading: "isLoading", error: "error" }
) => {
  builder
    .addCase(action.pending, (state) => {
      state[options.loading] = true;
      state.isError = false;
      state[options.error] = "";
    })
    .addCase(action.fulfilled, (state, action) => {
      state[options.loading] = false;
      state[action.meta.arg] = action.payload;
    })
    .addCase(action.rejected, (state, action) => {
      state[options.loading] = false;
      state.isError = true;
      state[options.error] =
        action.error.message || "Une erreur inconnue s'est produite";
    });
};

/**
 * Trouve un élément dans un tableau par son ID
 * @param array Tableau d'éléments
 * @param id ID de l'élément à trouver
 * @returns L'élément trouvé ou undefined
 */
export const findItemById = <T extends { id: string | number }>(
  array: T[],
  id: string | number
): T | undefined => {
  return array.find((item) => item.id === id);
};

/**
 * Met à jour le total des éléments dans le panier
 * @param likeCart Tableau de produits
 * @returns Le total des quantités
 */
export const updateCartTotals = (likeCart: MenuItem[]): number => {
  return likeCart.reduce((total, item) => total + item.quantity, 0);
};
