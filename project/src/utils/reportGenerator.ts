import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Goal } from '../db/database';
import { formatDate } from './dateUtils';
import { GOAL_CATEGORIES } from '../types/goals';

export const generateGoalsReport = (goals: Goal[]) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(20);
  doc.text('Fox River Planner - Goals Report', 14, 20);
  doc.setFontSize(12);
  doc.text(`Generated on ${formatDate(new Date())}`, 14, 30);

  // Summary Statistics
  const stats = {
    total: goals.length,
    completed: goals.filter(g => g.status === 'completed').length,
    inProgress: goals.filter(g => g.status === 'in-progress').length,
    notStarted: goals.filter(g => g.status === 'not-started').length,
  };

  doc.text('Summary Statistics:', 14, 40);
  doc.text(`Total Goals: ${stats.total}`, 20, 50);
  doc.text(`Completed: ${stats.completed}`, 20, 57);
  doc.text(`In Progress: ${stats.inProgress}`, 20, 64);
  doc.text(`Not Started: ${stats.notStarted}`, 20, 71);

  // Goals Table
  const tableData = goals.map(goal => [
    goal.title,
    GOAL_CATEGORIES[goal.category]?.label || goal.category,
    goal.status,
    `${goal.progress}%`,
    formatDate(goal.timebound)
  ]);

  autoTable(doc, {
    startY: 80,
    head: [['Title', 'Category', 'Status', 'Progress', 'Due Date']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [27, 38, 49] },
    styles: { fontSize: 10 }
  });

  // Category Distribution
  const categoryStats = Object.entries(GOAL_CATEGORIES).map(([key, { label }]) => ({
    category: label,
    count: goals.filter(g => g.category === key).length
  }));

  const categoryStartY = doc.lastAutoTable?.finalY || 80;
  doc.text('Goals by Category:', 14, categoryStartY + 20);
  
  categoryStats.forEach((stat, index) => {
    doc.text(`${stat.category}: ${stat.count}`, 20, categoryStartY + 30 + (index * 7));
  });

  return doc;
};