import NavBar from '@/components/NavBar'
import React from 'react'

const Home = () => {
    const imageSrcPath = "/path/to/image";
    const navItems = ["Item 1", "Item 2", "Item 3"];
    return (
        <div>
          <NavBar 
            brandName="My Brand" 
            imageSrcPath={imageSrcPath} 
            navItems={navItems} 
          />
        </div>
      );
}
export default Home;



