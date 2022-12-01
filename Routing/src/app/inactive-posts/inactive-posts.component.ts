import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { attivaPost, getPostFiltered } from '../post-service.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-inactive-posts',
  templateUrl: './inactive-posts.component.html',
  styleUrls: ['./inactive-posts.component.scss']
})
export class InactivePostsComponent implements OnInit {

  posts:Post[]=[]

  constructor(private postSRV:PostService) { }

  ngOnInit(): void {
    this.posts = this.postSRV.getPostsFiltrati(false)
  }


  attiva(id:number) {
    attivaPost(id)
    this.posts = this.posts.filter((e)=>{
      return !(e.id == id)
    })
  }
}
