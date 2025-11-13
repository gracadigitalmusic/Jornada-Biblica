import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Award, Star } from 'lucide-react';
import { usePlayerLevel } from '@/hooks/usePlayerLevel';

export function PlayerLevelCard() {
  const level = usePlayerLevel();
  const nextLevel = level.getNextLevel();
  const progress = level.getProgressToNextLevel();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Star className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Seu Nível</p>
              <p className="font-black text-lg text-gradient-primary">
                {level.currentLevel.title}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="text-lg font-bold">
            Nv. {level.currentLevel.level}
          </Badge>
        </div>

        {nextLevel && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                Progresso para {nextLevel.title}
              </span>
              <span className="font-bold">{Math.floor(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3" />
              <span>
                {level.totalScore} / {nextLevel.minScore} pontos
              </span>
            </div>
          </div>
        )}

        {!nextLevel && (
          <div className="flex items-center gap-2 text-sm text-success">
            <Award className="w-4 h-4" />
            <span className="font-bold">Nível Máximo Alcançado!</span>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
