import { Injectable } from '@angular/core';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts:Post[] = []
  //i dati che vengono letti quando carichiamo una delle pagine

  constructor() { }

  fetchData() {    
    let token = localStorage.getItem("token")
    if(token){
      fetch("http://localhost:3000/posts", {
        headers: { 
          "Authorization": "Bearer " + token
        }
      }).then(res=>res.json()).then(res=>{
        this.posts = res
      })

      // this.http.get("http://localhost:3000/posts", null, {
      //   headers: {
      //     "Authorization": "Bearer " + token
      //   }
      // })
    }
  }

  getPostsFiltrati(a:boolean) {
    return this.posts.filter(p=>p.active==a)
  }

  private toggleServicePost(id:number) {
    console.log("toggle", id);
    
    this.posts = this.posts.map((e)=>{
      if(e.id == id) { 
        console.log(e, e.active);
        e.active = !e.active
      }
      return e
    })
    console.log(this.posts);
    
  }

  toggleDbPost(id:number) {
    //QUA USO LO SPREAD OPERATOR PERCHÈ VOGLIO UNA COPIA DELL'ELEMENTO TROVATO E NON DIRETTAMENTE QUELLO DELL'ARRAY
    //IL METODO .FIND() RESTITUISCE L'OGGETTO DELL'ARRAY, MODIFICARE postDiArray MODIFICA L'ELEMENTO INTERNO A THIS.POSTS
    let postDiArray = this.posts.find(p=>p.id==id)
    let postClone = {...postDiArray}
    if(postDiArray == undefined) {
      throw new Error("Elemento non trovato")
    }
    //SE FACESSIMO QUESTA OPERAZIONOE SU postDiArray AVREMMO GIÀ MODIFICATO L'ARRAY THIS.POSTS SENZA PERÒ ESSERE SICURI DI AVER AVUTO UN SUCCESSO CON IL FETCH
    //QUINDI USO LA VARIABILE "CLONE" DELL'ELEMENTO TROVATO COSÌ CHE LA MODIFICA VENGA FATTA DAL METODO toggleServicePost COME ABBIAMO VISTO INSIEME
    postClone.active = !postClone.active
    //QUESTA MODIFICA SERVE PER PASSARE IL POST MODIFICATO AL FETCH PER MODIFICARE IL DB, SOLO AL COMPLETAMENTO CI VA BENE MODIFICARE THIS.POSTS
    return fetch("http://localhost:3000/posts/"+id, {
      method:"PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postClone)
    }).then((res)=>{
      if(res.ok) {
        this.toggleServicePost(id)
      } else {
        console.log("err");
      }
      return res
    })
  }

  deleteDb(id:number) {
    return fetch("http://localhost:3000/posts/"+id, {
      method:"DELETE"
    }).then(res=>{
      if(res.ok) {
        this.deleteService(id)
      }
      return res
    })
  }

  private deleteService(id:number) {
    this.posts = this.posts.filter(e=>e.id != id)    
  }
}
