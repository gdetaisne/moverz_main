import { permanentRedirect } from 'next/navigation';

export default function Page() {
  // Redirection 308 vers le corridor canonique Rennes → Toulouse
  permanentRedirect('/rennes-vers-toulouse/');
}


