import React, {useReducer} from 'react';

export default (reducer, actions, defaultValue) => {
  const Context = React.createContext();

  const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      // value represents the value for the context which
      // we need to pass each default nested component
      <Context.Provider value={{state, ...boundActions}}>
        {children}
      </Context.Provider>
      //Children is actually the <app/> component
      //Through Context.Provider, we provide the way to pass data in app component
    );
  };
  return {Context, Provider};
};

//******** This code is write for to passing the array to childern components */

// const BlogContext = React.createContext();

// export const BlogProvider = ({children}) => {
//   const blogPosts = [{title: 'Post 1'}, {title: 'Post 2'}];

//   return (
//     <BlogContext.Provider value={blogPosts}>{children}</BlogContext.Provider>
//   );
// };

// export default BlogContext;
