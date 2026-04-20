import{j as e}from"./index-CwyuVOBM.js";const s=({children:o})=>e.jsx("span",{className:"text-base text-white font-semibold rounded px-3 py-2 mr-2 mb-2 backdrop-blur-lg",style:{backgroundColor:"rgba(191,188,186,0.5)",fontFamily:"'Koulen', sans-serif"},children:o}),d=({project:o,showTitleBelow:l=!1,onCardHover:t,size:n="full"})=>{const i=n==="large"||n==="small"?"h-[520px]":"h-[320px] md:h-[440px]";return e.jsxs(e.Fragment,{children:[e.jsxs("a",{href:o.link,target:"_blank",rel:"noopener noreferrer",className:`group relative overflow-hidden rounded-3xl shadow w-full block focus:outline-none focus:ring-4 focus:ring-indigo-400 ${i}`,style:{backgroundImage:`url(${o.image})`,backgroundSize:"cover",backgroundPosition:"center"},onMouseEnter:()=>t&&t(!0),onMouseLeave:()=>t&&t(!1),tabIndex:0,"aria-label":`View ${o.title} on GitHub`,children:[e.jsx("div",{className:"absolute top-0 left-0 m-8 flex flex-wrap z-20 hidden md:flex opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300",children:o.technologies.map(a=>e.jsx(s,{children:a},a))}),!l&&e.jsx("span",{className:`
              absolute left-0 bottom-0 m-8
              text-2xl md:text-4xl font-bold text-white drop-shadow-lg
              z-20
              opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300
              hidden md:inline
            `,style:{fontFamily:"'Nothing You Could Do', cursive"},children:o.title}),e.jsx("div",{className:`
            absolute inset-0
            bg-transparent
            md:bg-black/40
            md:backdrop-blur
            opacity-100
            md:opacity-0 md:group-hover:opacity-100 md:group-focus:opacity-100
            transition-opacity duration-300
            w-full h-full
            pointer-events-none
            z-10
          `})]}),e.jsx("div",{className:"mt-4 ml-2 text-4xl font-bold text-white md:hidden",style:{fontFamily:"'Koulen', sans-serif"},children:o.title})]})};export{d as default};
