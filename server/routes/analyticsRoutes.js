import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { statusBreakdown, applicationsTimeSeries, eligibilityHistogram, incomeGroups, blockchainActivity, adminActionsLog, beneficiariesGeo } from '../controllers/analyticsController.js';

const router = express.Router();

router.get('/status-breakdown', protect, authorize('admin'), statusBreakdown);
router.get('/applications-timeseries', protect, authorize('admin'), applicationsTimeSeries);
router.get('/eligibility-histogram', protect, authorize('admin'), eligibilityHistogram);
router.get('/income-groups', protect, authorize('admin'), incomeGroups);
router.get('/blockchain-activity', protect, authorize('admin'), blockchainActivity);
router.get('/admin-actions', protect, authorize('admin'), adminActionsLog);
router.get('/geo/beneficiaries', protect, authorize('admin'), beneficiariesGeo);

export default router;