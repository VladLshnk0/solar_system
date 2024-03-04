import dynamic from "next/dynamic";

const Wall = dynamic(() => import('./Wall'), {
    ssr: false
});

export default Wall