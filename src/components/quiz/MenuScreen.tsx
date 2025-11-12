import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, Users, User, Zap, Target, Award } from "lucide-react";

interface MenuScreenProps {
  onStartSolo: () => void;
  onStartMultiplayer: () => void;
  onShowRanking: () => void;
  onShowAchievements: () => void;
}

export function MenuScreen({ onStartSolo, onStartMultiplayer, onShowRanking, onShowAchievements }: MenuScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      {/* Logo/Title */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-6xl md:text-7xl font-black mb-4 tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          <span className="text-gradient-primary">JORNADA</span>
          <br />
          <span className="text-gradient-secondary">BÍBLICA</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-medium">
          Teste seu conhecimento das Escrituras
        </p>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground flex-wrap">
          <Zap className="w-4 h-4 text-secondary" />
          <span>Quiz Competitivo</span>
          <span>•</span>
          <Trophy className="w-4 h-4 text-primary" />
          <span>Ranking Global</span>
          <span>•</span>
          <Award className="w-4 h-4 text-success" />
          <span>Conquistas</span>
        </div>
      </motion.div>

      {/* Game Mode Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
          <button
            onClick={onStartSolo}
            className="relative w-full bg-quiz-card hover:bg-quiz-card-hover border-2 border-primary/20 hover:border-primary rounded-2xl p-8 text-left transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                <User className="w-8 h-8 text-primary" />
              </div>
              <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                POPULAR
              </span>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              Modo Solo
            </h3>
            <p className="text-muted-foreground mb-4">
              Sua jornada pessoal rumo ao topo do ranking. Conquiste badges e estabeleça recordes!
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Trophy className="w-4 h-4 text-secondary" />
                <span className="text-muted-foreground">Hall da Fama</span>
              </div>
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4 text-success" />
                <span className="text-muted-foreground">Conquistas</span>
              </div>
            </div>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-secondary to-orange-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
          <button
            onClick={onStartMultiplayer}
            className="relative w-full bg-quiz-card hover:bg-quiz-card-hover border-2 border-secondary/20 hover:border-secondary rounded-2xl p-8 text-left transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-secondary/10 rounded-xl group-hover:bg-secondary/20 transition-colors">
                <Users className="w-8 h-8 text-secondary" />
              </div>
              <span className="text-xs font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                2-5 JOGADORES
              </span>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">
              Multiplayer
            </h3>
            <p className="text-muted-foreground mb-4">
              Batalha épica em família! Competição ao vivo para 2 a 5 participantes.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Tempo Real</span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="w-4 h-4 text-success" />
                <span className="text-muted-foreground">Competitivo</span>
              </div>
            </div>
          </button>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-wrap justify-center gap-4"
      >
        <Button variant="outline" size="lg" className="gap-2" onClick={onShowRanking}>
          <Trophy className="w-5 h-5" />
          Hall da Fama
        </Button>
        <Button variant="outline" size="lg" className="gap-2" onClick={onShowAchievements}>
          <Award className="w-5 h-5" />
          Conquistas
        </Button>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center text-sm text-muted-foreground"
      >
        <p>Desenvolvido com ❤️ pela Graça Digital Music</p>
      </motion.div>
    </motion.div>
  );
}
