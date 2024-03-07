import { GameObjectFormResult } from "@shared/gameObjectFormResult";
 
export async function addGameObject(formData: GameObjectFormResult): Promise<boolean> {
    try {
        const response: Response = await fetch(`${viteConfiguration.API_URL}gameobject/add`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
   
        if (response.ok) {
            return true;
        } else {
   
            console.error("Failed to add game object", await response.text());
            return false;
        }
    } catch (error) {
        console.error("Error adding game object:", error);
        return false;
    }
}
