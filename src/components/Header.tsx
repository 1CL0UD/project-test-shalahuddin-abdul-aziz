import { useEffect, useState } from 'react';

const Header = () => {
  const [selectedNavItem, setSelectedNavItem] = useState('Ideas');
  const [prevScrollPos, setPrevScrollPos] = useState(0); // State to track previous scroll position
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [visible, setVisible] = useState(true);

  const handleNavItemSelect = (itemName: string) => {
    setSelectedNavItem(itemName);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(
        (prevScrollPos > currentScrollPos || currentScrollPos < 10) &&
          currentScrollPos < 200
      );
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const setOpacity = () => {
    if (window.scrollY <= 10) {
      return 'opacity-100';
    } else if (window.scrollY <= 200) {
      return 'opacity-75';
    } else {
      return 'opacity-0';
    }
  };

  return (
    <nav
      className={`flex justify-between items-center bg-orange-500 py-6 px-12 fixed w-full transition-opacity duration-300 ${setOpacity()}`}
    >
      <img
        src="https://suitmedia.com/_nuxt/img/logo-white.081d3ce.png"
        alt="Suitmedia"
        className="h-10"
      />
      <ul className="flex space-x-4 text-white">
        {['Work', 'About', 'Services', 'Ideas', 'Careers', 'Contact'].map(
          (item) => (
            <li
              key={item}
              className={selectedNavItem === item ? 'underline' : ''}
              onClick={() => handleNavItemSelect(item)}
            >
              {item}
            </li>
          )
        )}
      </ul>
    </nav>
  );
};

export default Header;
