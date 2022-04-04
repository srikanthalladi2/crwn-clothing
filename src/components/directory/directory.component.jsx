import React from 'react';
import DirectoryItem from "../directory-item/directory-item.component";
import './directory.styles.scss';

class Directory extends React.Component{
    constructor(){
        super();
        this.state = {
            sections : [
                {
                  title: 'hats',
                  imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
                  id: 1,
                  route: 'shop/hats'
                },
                {
                  title: 'jackets',
                  imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
                  id: 2,
                  route: 'shop/jackets'
                },
                {
                  title: 'sneakers',
                  imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
                  id: 3,
                  route: 'shop/sneakers'
                },
                {
                  title: 'womens',
                  imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
                  size: 'large',
                  id: 4,
                  route: 'shop/womens'
                },
                {
                  title: 'mens',
                  imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
                  size: 'large',
                  id: 5,
                  route: 'shop/mens'
                }
              ]
        }
    }
    render(){
        return(
            <div className = "directory-menu">
                {this.state.sections.map(({title, id, imageUrl, size, route}) => {
                    return <DirectoryItem key={id} title={title} imageUrl={imageUrl} size={size} route={route}/>
                })}
            </div>
        );
    }
}


export default Directory;