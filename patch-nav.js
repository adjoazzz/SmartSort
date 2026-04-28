import fs from 'fs';
import path from 'path';

const files = {
  Dashboard: {
    path: './src/imports/Dashboard/Dashboard.tsx',
    navLines: `        <ActiveTabDashboard />
        <Container89 />
        <Container92 />
        <Container95 />
        <Container98 />
        <Container101 />`,
    components: ['ActiveTabDashboard', 'Container89', 'Container92', 'Container95', 'Container98', 'Container101']
  },
  Analytics: {
    path: './src/imports/Analytics/Analytics.tsx',
    navLines: `        <Link />
        <Link1 />
        <Link2 />
        <Link3 />
        <Link4 />
        <Link5 />`,
    components: ['Link', 'Link1', 'Link2', 'Link3', 'Link4', 'Link5']
  },
  Devices: {
    path: './src/imports/Devices/Devices.tsx',
    navLines: `        <Link />
        <Link1 />
        <Link2 />
        <Link3 />
        <Link4 />
        <Link5 />`,
    components: ['Link', 'Link1', 'Link2', 'Link3', 'Link4', 'Link5']
  },
  Alerts: {
    path: './src/imports/Alerts/Alerts.tsx',
    navLines: `        <Link />
        <Link1 />
        <Link2 />
        <Link3 />
        <Link4 />
        <Link5 />`,
    components: ['Link', 'Link1', 'Link2', 'Link3', 'Link4', 'Link5']
  },
  CollectionJobs: {
    path: './src/imports/CollectionJobs/CollectionJobs.tsx',
    navLines: `        <Container62 />
        <Container65 />
        <Container68 />
        <Container71 />
        <BackgroundVerticalBorder />
        <Container76 />`,
    components: ['Container62', 'Container65', 'Container68', 'Container71', 'BackgroundVerticalBorder', 'Container76']
  },
  UserManagement: {
    path: './src/imports/UserManagement/UserManagement.tsx',
    navLines: `      <Link />
      <Link1 />
      <Link2 />
      <Link3 />
      <Link4 />
      <Link5 />`,
    components: ['Link', 'Link1', 'Link2', 'Link3', 'Link4', 'Link5'],
    indent: '      '
  }
};

const routes = ['/dashboard', '/analytics', '/devices', '/alerts', '/jobs', '/admin'];

for (const [name, config] of Object.entries(files)) {
  let content = fs.readFileSync(config.path, 'utf8');
  
  if (!content.includes('import { Link as RouterLink }')) {
    content = 'import { Link as RouterLink } from "react-router";\\n' + content;
  }
  
  const indent = config.indent || '        ';
  const replacementLines = config.components.map((comp, idx) => {
    return \`\${indent}<RouterLink to="\${routes[idx]}" className="w-full block no-underline"><\${comp} /></RouterLink>\`;
  }).join('\\n');
  
  if (content.includes(config.navLines)) {
    content = content.replace(config.navLines, replacementLines);
    fs.writeFileSync(config.path, content);
    console.log(\`Patched \${name}\`);
  } else {
    console.log(\`Could not find navLines in \${name}\`);
  }
}