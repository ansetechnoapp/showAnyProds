import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "../components/ui/alert-dialog";
  
  const Buy = () => {
    const handleFormSubmit = (event) => {
      event.preventDefault(); // Empêche la soumission par défaut
      const form = event.target;
  
      if (form.checkValidity()) {
        alert("Formulaire valide !");
        
      } else {
        alert("Veuillez remplir tous les champs correctement.");
      }
    };
  
    return (
      <div>
        <AlertDialog>
          <AlertDialogTrigger className="">Add to Card</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogDescription>
                <h2 className="text-2xl font-bold mb-4">Entrer vos informations</h2>
                <form onSubmit={handleFormSubmit}>
                  <label className="block mb-2">Nom et prénom:</label>
                  <input
                    type="text"
                    required
                    className="w-full mb-4 p-2 border rounded"
                  />
                  <label className="block mb-2">Email:</label>
                  <input
                    type="email"
                    required
                    className="w-full mb-4 p-2 border rounded"
                  />
                  <label className="block mb-2">Adresse:</label>
                  <input
                    type="text"
                    required
                    className="w-full mb-4 p-2 border rounded"
                  />
                  <label htmlFor="phone" className="block mb-2">
                    Numéro de téléphone:
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Entrez votre numéro de téléphone"
                  />
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-red-600 hover:bg-blue-700">
                         <p className="text-white">Cancel</p>
                    </AlertDialogCancel>
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                    <p className="text-white">Valider le paiement</p>

                    </button>
                  </AlertDialogFooter>
                </form>
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  };
  
  export default Buy;
  