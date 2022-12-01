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
    fetch("http://localhost:3000/posts").then(res=>res.json()).then(res=>{
      this.posts = res
    })
  }

  getPostsFiltrati(a:boolean) {
    return this.posts.filter(p=>p.active==a)
  }

  private toggleServicePost(id:number) {
    this.posts = this.posts.map((e)=>{
      if(e.id == id) { 
        e.active = !e.active
      }
      return e
    })
  }

  toggleDbPost(id:number) {
    let post = this.posts.find(p=>p.id==id)
    if(post == undefined) {
      throw new Error("Elemento non trovato")
    }
    post.active = !post.active
    return fetch("http://localhost:3000/posts/"+id, {
      method:"PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    }).then((res)=>{
      if(res.ok) {
        this.toggleServicePost(id)
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
