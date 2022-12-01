import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { getPostFiltered, disattivaPost } from '../post-service.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-active-posts',
  templateUrl: './active-posts.component.html',
  styleUrls: ['./active-posts.component.scss']
})
export class ActivePostsComponent implements OnInit {

  posts:Post[] = []
  //i dati visualizziamo (e manipoliamo in questo component)

  constructor(private postSRV:PostService) { }

  ngOnInit(): void {
    this.getPosts()
  }

  disattiva(id:number) {
    this.postSRV.toggleDbPost(id).then(res=>{
      if(res.ok){
        this.getPosts()
      }
    })
    // this.postSRV.toggleServicePost(id)
  }

  elimina(id:number) {
    this.postSRV.deleteDb(id).then(res=>{
      if(res.ok) {
        this.getPosts()
      }
    })
  }

  getPosts() {
    this.posts = this.postSRV.getPostsFiltrati(true)
  }


}
