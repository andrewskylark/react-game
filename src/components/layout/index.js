import s from './style.module.css';

const Layout = ({title, id, urlBg, colorBg, children}) => {
    const layoutStyle = {};

    if (urlBg) {
        layoutStyle.backgroundImage = `url("${urlBg}")`;
    }
    if (colorBg) {
        layoutStyle.backgroundColor =  colorBg;
    }

    return (
        <section 
        className={s.root}
        id={id}
        style= {layoutStyle}
        >
            <div className={s.wrapper}>
                <article>
                     <div className={s.title}>
                        <h3>{ title }</h3>
                        <span className={s.separator}></span>
                    </div>
                    <div className={`${s.desc} ${s.full}`}>
                        {children}
                    </div>
                </article>
            </div>
        </section>
    )
}

export default Layout;