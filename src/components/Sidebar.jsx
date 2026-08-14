import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { SUBGROUPS } from '../data/modulesData';

export default function Sidebar({ currentModule, onSelectModule, onOpenTestRunner, onOpenTestModal }) {
  const [searchQuery, setSearchQuery] = useState('');
  const openTestRunner = onOpenTestModal || onOpenTestRunner;

  // Filter subgroups, categories and items according to the search query
  const query = searchQuery.trim().toLowerCase();

  const filteredSubgroups = SUBGROUPS.map(subgroup => {
    const matchingCategories = subgroup.categories.map(cat => {
      const items = cat.items.filter(item =>
        !query ||
        item.title.toLowerCase().includes(query) ||
        (item.tag && item.tag.toLowerCase().includes(query)) ||
        cat.title.toLowerCase().includes(query) ||
        subgroup.title.toLowerCase().includes(query)
      );
      return { ...cat, items };
    }).filter(cat => cat.items.length > 0);

    return { ...subgroup, categories: matchingCategories };
  }).filter(subgroup => subgroup.categories.length > 0);

  const renderIcon = (name, className = "w-4 h-4") => {
    const IconComponent = Icons[name] || Icons.Code;
    return <IconComponent className={className} />;
  };

  return (
    <aside className="sidebar">
      {/* Brand Header with Zealous SVG Logo */}
      <div className="brand-header">
        <div className="brand-logo-wrap" title="Zealous DSA Master Suite">
          <svg width="160" height="36" viewBox="0 0 160 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full xl:-ml-3">
            <g id="Logo">
              <g id="Logo_2">
                <path id="Vector" d="M156.004 5.44457H154.947V8.43522H154.534V5.44457H153.477V5.13519H155.991V5.44457H156.004ZM160 8.43522H159.588V5.48324H159.575L158.44 8.43522H158.17L157.035 5.48324H157.022V8.43522H156.61V5.13519H157.357L158.298 7.57154H158.311L159.239 5.13519H159.987V8.43522H160Z" fill="currentColor"></path>
                <path id="Vector_2" d="M21.1795 28.4417V34.3457H0V28.9316L11.6403 15.2416H0.850789V9.3634H20.7541V15.1256L9.25556 28.4417H21.1795Z" fill="currentColor"></path>
                <path id="Vector_3" d="M45.6462 18.7737C45.3498 16.8272 44.6665 15.087 43.6611 13.6174C43.0939 12.7795 42.4493 12.0447 41.7146 11.426C40.9927 10.8072 40.1935 10.2916 39.3169 9.90487C37.5895 9.13142 35.6172 8.73181 33.4645 8.73181C29.8293 8.73181 26.8257 9.89198 24.5312 12.1994C22.2366 14.5069 21.0894 17.8456 21.0894 22.1253C21.0894 26.7015 22.3784 30.066 24.9179 32.1156C27.4445 34.1524 30.3965 35.1836 33.6836 35.1836C37.6798 35.1836 40.8509 33.959 43.0681 31.5355C44.5119 30.0016 45.3369 28.4547 45.5173 26.9464L45.5689 26.5597H38.4919L38.3887 26.7402C38.0278 27.4105 37.6282 27.939 37.1641 28.3C36.3262 28.9832 35.2176 29.3312 33.8641 29.3312C32.5106 29.3312 31.4535 29.0347 30.5512 28.4676C29.1203 27.591 28.3469 26.1214 28.1922 23.9816H45.8525V23.6335C45.8912 21.5194 45.8138 19.8823 45.6462 18.7608V18.7737ZM28.3855 19.1089C28.6304 17.794 29.1461 16.7241 29.9195 15.9377C30.7445 15.087 31.9305 14.6487 33.4645 14.6487C34.8696 14.6487 36.0555 15.0612 36.9965 15.8733C37.8602 16.6081 38.3759 17.7038 38.5434 19.096H28.3984L28.3855 19.1089Z" fill="currentColor"></path>
                <path id="Vector_4" d="M69.7519 32.7472C69.391 32.5796 69.1203 32.3733 68.9527 32.1284C68.8367 31.9608 68.682 31.5741 68.6304 30.6202C68.6047 29.5374 68.5789 28.5963 68.5789 27.8229V16.6853C68.5789 13.6302 67.4703 11.5161 65.2788 10.4075C63.1648 9.33757 60.7155 8.78326 58.0085 8.78326C53.8061 8.78326 50.8025 9.90476 49.0494 12.122C47.9537 13.54 47.322 15.3575 47.1931 17.549L47.1673 17.9228H53.9608L54.0123 17.6263C54.1541 16.7626 54.4248 16.0665 54.8373 15.5767C55.3916 14.9193 56.3971 14.5841 57.8022 14.5841C59.0913 14.5841 60.071 14.7646 60.7155 15.1126C61.2956 15.4349 61.5792 16.0021 61.5792 16.8658C61.5792 17.5361 61.2054 18.0259 60.419 18.3482C59.9421 18.5545 59.1171 18.7349 57.9827 18.8767L55.8041 19.1474C53.3033 19.4697 51.3697 19.9982 50.0678 20.7459C47.6443 22.1381 46.4197 24.4197 46.4197 27.5264C46.4197 29.9241 47.1802 31.8061 48.7013 33.121C50.1967 34.423 52.1174 35.0933 54.4119 35.0933C56.1909 35.0933 57.828 34.6808 59.246 33.8687C60.1999 33.3144 61.0765 32.6569 61.8499 31.9093C61.8886 32.18 61.9144 32.4249 61.9659 32.6698C62.0433 33.121 62.1851 33.6109 62.3913 34.1265L62.4687 34.3456H69.9582V32.8374L69.7519 32.7472ZM56.2682 29.7952C55.469 29.7952 54.8116 29.5889 54.2573 29.1507C53.7287 28.7381 53.4709 28.0549 53.4709 27.0752C53.4709 25.9795 53.9092 25.1932 54.7987 24.6776C55.353 24.3553 56.294 24.0846 57.6088 23.8526L59.0526 23.5818C59.7874 23.44 60.3804 23.2983 60.8186 23.1307C61.0765 23.0404 61.3214 22.9244 61.5792 22.7955V24.5487C61.5405 26.5467 60.9733 27.926 59.9034 28.6608C58.7948 29.4214 57.5702 29.7952 56.2682 29.7952Z" fill="currentColor"></path>
                <path id="Vector_5" d="M78.5691 0.816833H71.5308V34.3457H78.5691V0.816833Z" fill="currentColor"></path>
                <path id="Vector_6" d="M102.34 12.5731C100.226 9.93054 97.0028 8.5899 92.736 8.5899C88.4692 8.5899 85.2336 9.93054 83.1324 12.5731C81.0441 15.19 79.9871 18.3353 79.9871 21.8932C79.9871 25.451 81.0441 28.6737 83.1324 31.2518C85.2465 33.8558 88.4692 35.1706 92.736 35.1706C94.863 35.1706 96.745 34.8355 98.3435 34.1909C99.9419 33.5335 101.283 32.5538 102.34 31.2518C104.428 28.6737 105.498 25.5283 105.498 21.8932C105.498 18.258 104.441 15.19 102.353 12.5731H102.34ZM88.7012 16.4919C89.6422 15.2544 90.9571 14.6614 92.7102 14.6614C94.4634 14.6614 95.7782 15.2544 96.7192 16.4919C97.6603 17.7423 98.1372 19.5599 98.1372 21.906C98.1372 24.2522 97.6603 26.0698 96.7192 27.3202C95.7911 28.5577 94.4763 29.1635 92.7231 29.1635C90.97 29.1635 89.6551 28.5577 88.7141 27.3202C87.7602 26.0698 87.2832 24.2393 87.2832 21.906C87.2832 19.5728 87.7731 17.7423 88.7141 16.5048L88.7012 16.4919Z" fill="currentColor"></path>
                <path id="Vector_7" d="M129.178 9.36347V34.3457H122.307V31.7031C122.101 31.9867 121.856 32.2446 121.598 32.4766C120.58 33.3918 119.575 34.0235 118.608 34.3586C117.654 34.6938 116.519 34.8743 115.243 34.8743C111.531 34.8743 108.991 33.5079 107.689 30.8008C106.967 29.3312 106.606 27.1656 106.606 24.3425V9.35059H113.812V24.3425C113.812 25.6703 113.967 26.6629 114.264 27.3074C114.779 28.416 115.785 28.9574 117.344 28.9574C119.368 28.9574 120.722 28.1582 121.457 26.534C121.843 25.6316 122.05 24.4199 122.05 22.9117V9.35059H129.178V9.36347Z" fill="currentColor"></path>
                <path id="Vector_8" d="M153.503 26.6498C153.503 29.1506 152.549 31.226 150.693 32.8116C148.837 34.3843 145.975 35.1706 142.146 35.1706C138.318 35.1706 135.327 34.3327 133.445 32.6698C131.55 30.994 130.596 28.8412 130.596 26.2502V25.9022H137.686L137.725 26.2115C137.854 27.2557 138.111 28.0033 138.498 28.4159C139.22 29.1893 140.612 29.576 142.636 29.576C143.835 29.576 144.776 29.4084 145.472 29.0604C146.104 28.7381 146.387 28.3127 146.387 27.694C146.387 27.0752 146.142 26.6627 145.653 26.3662C145.266 26.1213 143.822 25.6057 139.117 24.4971C136.32 23.801 134.296 22.9115 133.136 21.8545C131.937 20.7845 131.331 19.2247 131.331 17.2267C131.331 14.8935 132.259 12.8567 134.09 11.1938C135.907 9.5309 138.498 8.68011 141.772 8.68011C144.866 8.68011 147.419 9.31176 149.378 10.5493C151.376 11.8126 152.536 14.0169 152.833 17.0849L152.871 17.4587H145.833L145.794 17.1493C145.717 16.4017 145.511 15.8087 145.176 15.3833C144.557 14.6227 143.435 14.2231 141.876 14.2231C140.574 14.2231 139.645 14.4165 139.117 14.8032C138.614 15.1642 138.382 15.5767 138.382 16.0407C138.382 16.6337 138.627 17.0462 139.13 17.3169C139.542 17.5489 141.012 18.0259 145.678 19.0443C148.257 19.6501 150.229 20.5912 151.531 21.8287C152.846 23.1178 153.516 24.7291 153.516 26.6498H153.503Z" fill="currentColor"></path>
              </g>
            </g>
          </svg>
        </div>
        <div className="brand-subtitle">
          <span className="w-2 h-2 rounded-full bg-accent-brand animate-ping"></span>
          DSA Master Suite • Clean Studio
        </div>
      </div>

      {/* Search Filter */}
      <div className="search-box-wrapper">
        <div className="search-input-container">
          <Icons.Search className="search-icon" />
          <input
            type="text"
            placeholder="Search structures & algorithms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="clear-search-btn"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Subgroups Navigation List */}
      <nav className="nav-categories custom-scrollbar">
        {filteredSubgroups.map(subgroup => (
          <div key={subgroup.id} className="subgroup-wrapper">
            {/* Subgroup Master Header */}
            <div className="subgroup-header">
              <div className="subgroup-title-row">
                {renderIcon(subgroup.icon, "subgroup-icon text-accent-brand")}
                <span className="subgroup-title">{subgroup.title}</span>
              </div>
              {subgroup.badge && (
                <span className="subgroup-badge">{subgroup.badge}</span>
              )}
            </div>

            {/* Subgroup Categories */}
            <div className="subgroup-content">
              {subgroup.categories.map(category => (
                <div key={category.id} className="category-group">
                  {/* Category Title (shown for nested algorithm categories) */}
                  {subgroup.categories.length > 1 && (
                    <div className="category-title">
                      {renderIcon(category.icon, "category-header-icon")}
                      <span>{category.title}</span>
                    </div>
                  )}

                  {/* Category Items */}
                  {category.items.map(item => {
                    const isActive = currentModule === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => onSelectModule(item.id)}
                        className={`nav-item ${isActive ? 'active' : ''}`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeNavIndicator"
                            className="active-nav-glow"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                        )}
                        <span className="nav-item-content">
                          {renderIcon(item.icon, `nav-item-icon ${isActive ? 'active-icon text-accent-brand' : ''}`)}
                          <span className="nav-item-title">{item.title}</span>
                        </span>
                        {item.tag && (
                          <span className="nav-item-tag">{item.tag}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Sidebar Footer with Unit Test Button */}
      <div className="sidebar-footer">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={openTestRunner}
          className="test-suite-btn"
        >
          <Icons.FlaskConical className="w-4 h-4 text-accent-brand" />
          <span>Run All Tests (44)</span>
        </motion.button>
      </div>
    </aside>
  );
}
