import dynamic from 'next/dynamic'
const Hero = dynamic(() => import('./_components/Hero'))

export default function Home() {
    return (
        <div>
            <Hero />
        </div>
    );
}
