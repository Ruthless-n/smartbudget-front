import { HeaderPage } from "@/components/header-page"
import WelcomeHeader from "@/components/welcome-header"

export function HomePage(){
    return(
        <div className="h-screen flex items-center justify-center w-full">
            <div className="w-full fixed top-0 flex items-center justify-center">
                <HeaderPage />
            </div>
            <main>
                <div className="text-3xl text-gray-300">
                    <WelcomeHeader/>
                </div>
                <div>
                    <section>
                        
                    </section>
                </div>
            </main> 
        </div>
            
    )
}