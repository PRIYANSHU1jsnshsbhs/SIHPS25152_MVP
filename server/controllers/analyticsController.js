import Application from '../models/Application.js';
import User from '../models/User.js';

// Mock helpers until real data logic is implemented
function daysArray(n) {
  const arr = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24*3600*1000);
    arr.push(d.toISOString().slice(0,10));
  }
  return arr;
}

export const statusBreakdown = async (req, res) => {
  // Using applications collection; fallback to user verified states if empty
  const totalApps = await Application.countDocuments();
  if (!totalApps) {
    const approved = await User.countDocuments({ blockchainHash: { $exists: true } });
    const pending = await User.countDocuments({ verified: true, blockchainHash: { $exists: false } });
    const rejected = await User.countDocuments({ verified: false });
    return res.json({ approved, pending, rejected });
  }
  const approved = await Application.countDocuments({ status: 'approved' });
  const pending = await Application.countDocuments({ status: 'pending' });
  const rejected = await Application.countDocuments({ status: 'rejected' });
  res.json({ approved, pending, rejected });
};

export const applicationsTimeSeries = async (req, res) => {
  const days = parseInt(req.query.days || '30', 10);
  const labels = daysArray(days);
  // Mock: random counts; replace with aggregation on Application.createdAt
  const data = labels.map((day, i) => ({ day, count: Math.floor(5 + (Math.sin(i/3)+1)*8 + Math.random()*4) }));
  res.json({ range: days, series: data });
};

export const eligibilityHistogram = async (req, res) => {
  // aiScore buckets over Users
  const users = await User.find({}, 'aiScore');
  const buckets = [0,20,40,60,80,100];
  const counts = buckets.slice(0, -1).map(() => 0);
  users.forEach(u => {
    const s = u.aiScore ?? Math.floor(Math.random()*100);
    for (let i=0;i<buckets.length-1;i++) {
      if (s >= buckets[i] && s < buckets[i+1]) { counts[i]++; break; }
    }
  });
  res.json({ buckets: buckets.map((b,i)=> i<buckets.length-1?`${b}-${buckets[i+1]-1}`:null).filter(Boolean), counts });
};

export const incomeGroups = async (req, res) => {
  // Mock distribution
  const groups = [
    { label: '<50k', value: 34 },
    { label: '50k-100k', value: 51 },
    { label: '100k-200k', value: 22 },
    { label: '200k+', value: 7 }
  ];
  res.json(groups);
};

export const blockchainActivity = async (req, res) => {
  const days = daysArray(14);
  const data = days.map((d,i)=> ({ day: d, tx: Math.floor(3 + Math.random()*10), verifyRate: +(0.85 + Math.sin(i/5)*0.05 + Math.random()*0.05).toFixed(2) }));
  res.json(data);
};

export const adminActionsLog = async (req, res) => {
  // Placeholder: would store in separate collection; for now derive counts from Users
  const admins = [ 'superadmin', 'ops1', 'ops2' ];
  const actions = admins.map(a => ({ admin: a, approvals: Math.floor(Math.random()*20), rejections: Math.floor(Math.random()*10) }));
  res.json(actions);
};

export const beneficiariesGeo = async (req, res) => {
  // Mock GeoJSON using approved users; fixed coordinates for major Indian cities
  const indianCities = [
    { name: 'Delhi', coords: [77.2090, 28.6139] },
    { name: 'Mumbai', coords: [72.8777, 19.0760] },
    { name: 'Bangalore', coords: [77.5946, 12.9716] },
    { name: 'Kolkata', coords: [88.3639, 22.5726] },
    { name: 'Chennai', coords: [80.2707, 13.0827] },
    { name: 'Hyderabad', coords: [78.4867, 17.3850] },
    { name: 'Pune', coords: [73.8567, 18.5204] },
    { name: 'Ahmedabad', coords: [72.5714, 23.0225] },
    { name: 'Jaipur', coords: [75.7873, 26.9124] },
    { name: 'Lucknow', coords: [80.9462, 26.8467] },
    { name: 'Chandigarh', coords: [76.7794, 30.7333] },
    { name: 'Bhopal', coords: [77.4126, 23.2599] },
    { name: 'Patna', coords: [85.1376, 25.5941] },
    { name: 'Indore', coords: [75.8577, 22.7196] },
    { name: 'Nagpur', coords: [79.0882, 21.1458] },
    { name: 'Surat', coords: [72.8311, 21.1702] },
    { name: 'Kochi', coords: [76.2673, 9.9312] },
    { name: 'Visakhapatnam', coords: [83.2185, 17.6868] }
  ];
  
  const approvedUsers = await User.find({ blockchainHash: { $exists: true } }, 'name aiScore');
  const features = [];
  
  // Map approved users to cities in order
  approvedUsers.forEach((u, i) => {
    const city = indianCities[i % indianCities.length];
    features.push({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: city.coords },
      properties: { name: u.name, score: u.aiScore ?? 85, status: 'approved' }
    });
  });
  
  // Add pending points at specific cities
  const pendingCities = [
    indianCities[1],  // Mumbai
    indianCities[3],  // Kolkata
    indianCities[5],  // Hyderabad
    indianCities[7],  // Ahmedabad
    indianCities[9],  // Lucknow
    indianCities[11], // Bhopal
    indianCities[13], // Indore
    indianCities[15], // Surat
    indianCities[2],  // Bangalore
    indianCities[4]   // Chennai
  ];
  
  pendingCities.forEach((city, i) => {
    features.push({ 
      type: 'Feature', 
      geometry: { type:'Point', coordinates: city.coords }, 
      properties: { name: 'Pending Application ' + (i + 1), score: 70, status:'pending' }
    });
  });
  
  // Add rejected points at specific cities
  const rejectedCities = [
    indianCities[8],  // Jaipur
    indianCities[10], // Chandigarh
    indianCities[12], // Patna
    indianCities[14], // Nagpur
    indianCities[16], // Kochi
    indianCities[17]  // Visakhapatnam
  ];
  
  rejectedCities.forEach((city, i) => {
    features.push({ 
      type: 'Feature', 
      geometry: { type:'Point', coordinates: city.coords }, 
      properties: { name: 'Rejected Application ' + (i + 1), score: 45, status:'rejected' }
    });
  });
  
  res.json({ type:'FeatureCollection', features });
};