import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { CountryFlag } from "~/components/auth/country-flag";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Plateforme de Révision Constitutionnelle - RDC</title>
        <meta 
          name="description" 
          content="Plateforme officielle de participation citoyenne pour la révision constitutionnelle de la République Démocratique du Congo" 
        />
      </Head>

      <main className="min-h-screen">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
          {/* National Colors Bar - Top */}
          <div className="absolute top-0 z-10 flex h-2 w-full">
            <div className="flex-1 bg-drc-blue" />
            <div className="flex-1 bg-drc-yellow" />
            <div className="flex-1 bg-drc-red" />
          </div>

          <div className="relative px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="grid items-center gap-12 lg:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center lg:text-left"
                >
                  <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                    République Démocratique du Congo
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-gray-300">
                    Ensemble, façonnons l'avenir de notre nation à travers la révision constitutionnelle.
                    Votre voix compte dans la construction d'un Congo plus fort et plus démocratique.
                  </p>
                  <div className="mt-10 flex justify-center gap-6 lg:justify-start">
                    {session ? (
                      <Link
                        href="/dashboard"
                        className="rounded-md bg-drc-blue px-8 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-600"
                      >
                        Accéder au tableau de bord
                      </Link>
                    ) : (
                      <Link
                        href="/auth/signup"
                        className="rounded-md bg-drc-blue px-8 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-600"
                      >
                        Participer
                      </Link>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="relative mx-auto max-w-lg lg:max-w-none"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <CountryFlag className="h-full w-full" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* National Colors Bar - Bottom */}
          <div className="absolute bottom-0 z-10 flex h-2 w-full">
            <div className="flex-1 bg-drc-blue" />
            <div className="flex-1 bg-drc-yellow" />
            <div className="flex-1 bg-drc-red" />
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Nos Valeurs Nationales
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  Justice - Paix - Travail
                </p>
              </motion.div>
            </div>

            <div className="mx-auto mt-16 grid max-w-lg gap-12 lg:max-w-none lg:grid-cols-3">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className={`mb-6 h-2 w-20 ${value.color}`} />
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {value.title}
                  </h3>
                  <p className="mt-4 text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gray-900 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Participez à la construction de notre avenir
                </h2>
                <p className="mt-4 text-lg text-gray-300">
                  Votre contribution est essentielle pour façonner l'avenir de la République Démocratique du Congo
                </p>
                {!session && (
                  <Link
                    href="/auth/signup"
                    className="mt-8 inline-block rounded-md bg-drc-yellow px-8 py-3 text-base font-semibold text-gray-900 shadow-sm transition hover:bg-yellow-400"
                  >
                    Créer un compte
                  </Link>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

const values = [
  {
    title: "Justice",
    description: "Un système judiciaire équitable et accessible pour tous les citoyens",
    color: "bg-drc-blue",
  },
  {
    title: "Paix",
    description: "La stabilité et l'harmonie entre tous les peuples de notre nation",
    color: "bg-drc-yellow",
  },
  {
    title: "Travail",
    description: "Le développement et la prospérité par l'effort collectif",
    color: "bg-drc-red",
  },
];

export default Home;