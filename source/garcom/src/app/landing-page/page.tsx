import Image from 'next/image';


export default function LandingPage() {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <Image
                src="/banner_landing-page.jpg"
                alt="Landing Page Banner"
                
            />
        </div>
    );
    }