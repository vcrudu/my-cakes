import Cake from './dataObjects/Cake';

class CakesDataAccess {
    static async getCakesList(): Promise<Array<Cake>> {
        let cakesRespose:any = await fetch('api/cakes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
              },
        });
        let cakesResposeJson:Array<Cake> = await cakesRespose.json()

        let cakes:Array<Cake> = [];
        return cakesResposeJson;
    }

    static async addNewCake(newCake: Cake, file: File): Promise<Cake | null> {
        let cakesRespose: any = null;
            console.log("add new cake")
            console.log(newCake)
            cakesRespose = await fetch('api/cakes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCake)
            });
            console.log("cakesRespose")
            console.log(cakesRespose)
        if (cakesRespose) {
            let cakeResult: Cake = await cakesRespose.json()
            console.log("cakeResult")
            console.log(cakeResult)
                console.log("new selectedFile")
                console.log(file)
                const fileNameparts = file.name.split('.');
                const fileExtension = fileNameparts[fileNameparts.length-1];
                var formData = new FormData()
                formData.append('file', file as Blob)
                formData.append('name', `${newCake.id}.${fileExtension}`)
                await fetch(`/api/images`, {
                    method: 'POST',
                    body: formData
                })
            return cakeResult;
        } else return null;
    }
}

export default CakesDataAccess;