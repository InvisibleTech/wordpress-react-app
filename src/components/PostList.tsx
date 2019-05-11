import * as React from 'react'
import { getPosts } from './getData'

interface PostListState {
    posts: Array<any>,
}

export class PostList extends React.Component<any, PostListState> {
    public state: PostListState = {
        posts: [],
    }

    componentDidMount() {
        fetch(`${getPosts}`, {
            mode: 'cors',
            credentials: 'omit',
        })
        .then(data => {
            return data.json()
        })
        .then(data => {
            this.setState({
                posts: data,
            })
        })
        .catch(error => {
            console.log(error)
            this.setState({
                posts: ['Failed'],
            })
        })
    }

    public render() {
        console.log(">>>>>>>>>>>")
        console.log(this.state.posts)
        return (
            <article>
                <h1>Posts</h1>
                {this.listPosts()}
            </article>
        )
    }

    private listPosts() {
        console.log("<<<<<<<<<<<<<<<<,")
        console.log(this.state.posts)
        return this.state.posts.map((p, i) =>
            { return (
                <div key={i}>
                    <h4>{p.title.rendered}</h4>
                    <p dangerouslySetInnerHTML={{__html: p.content.rendered}}/>>
                </div>
            )}
        )
    }
}