let wreq; webpackChunkdiscord_app.push([[Symbol()],{},(r) => wreq = r]);
webpackChunkdiscord_app.pop();

let _mods = Object.values(wreq.c);

const findByProps = (...props) => {
    for (let m of _mods) {
        try {
            if (!m.exports || m.exports === window) continue;
            if (props.every((x) => m.exports?.[x])) return m.exports;

            for (let ex in m.exports) {
                if (props.every((x) => m.exports?.[ex]?.[x])) return m.exports[ex];
            }
        } catch {}
    }
}

export default findByProps