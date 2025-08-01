import { Palmtree, Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Palmtree className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">TropiTech</span>
                <span className="text-sm text-gray-400 block leading-none">Solutions</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Innovative software solutions for The Bahamas and Caribbean businesses, specializing in AI integrations
              and custom development.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Custom Software Development
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  AI Integrations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Web Applications
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Mobile Applications
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  CRM Systems
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Industries</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Tourism & Hospitality
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Construction
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Financial Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Real Estate
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Healthcare
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (242) 555-0123</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>hello@tropitechsolutions.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Downtown Nassau, The Bahamas</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 TropiTech Solutions. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
