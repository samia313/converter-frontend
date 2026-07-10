'use server'

import { db } from './db'
import { conversions, userStats } from './db/schema'
import { eq, and } from 'drizzle-orm'

export interface ConversionRequest {
  userId: string
  toolName: string
  inputFileName: string
  inputFileSize: number
}

// Track conversion start
export async function startConversion(request: ConversionRequest) {
  try {
    const conversion = await db
      .insert(conversions)
      .values({
        userId: request.userId,
        toolName: request.toolName,
        inputFileName: request.inputFileName,
        inputFileSize: request.inputFileSize,
        status: 'processing',
      })
      .returning()

    return conversion[0]
  } catch (error) {
    console.error('[v0] Error starting conversion:', error)
    throw error
  }
}

// Complete conversion successfully
export async function completeConversion(
  conversionId: string,
  userId: string,
  outputFileName: string,
  outputFileSize: number
) {
  try {
    const conversion = await db
      .update(conversions)
      .set({
        outputFileName,
        outputFileSize,
        status: 'completed',
        completedAt: new Date(),
      })
      .where(and(eq(conversions.id, conversionId), eq(conversions.userId, userId)))
      .returning()

    // Update user stats
    if (conversion[0]) {
      await updateUserStats(userId)
    }

    return conversion[0]
  } catch (error) {
    console.error('[v0] Error completing conversion:', error)
    throw error
  }
}

// Log conversion error
export async function failConversion(
  conversionId: string,
  userId: string,
  error: string
) {
  try {
    const conversion = await db
      .update(conversions)
      .set({
        status: 'failed',
        errorMessage: error,
        completedAt: new Date(),
      })
      .where(and(eq(conversions.id, conversionId), eq(conversions.userId, userId)))
      .returning()

    return conversion[0]
  } catch (err) {
    console.error('[v0] Error failing conversion:', err)
    throw err
  }
}

// Get user conversion history
export async function getUserConversions(userId: string) {
  try {
    return await db
      .select()
      .from(conversions)
      .where(eq(conversions.userId, userId))
  } catch (error) {
    console.error('[v0] Error getting user conversions:', error)
    return []
  }
}

// Update user stats
export async function updateUserStats(userId: string) {
  try {
    const userConversions = await db
      .select()
      .from(conversions)
      .where(eq(conversions.userId, userId))

    const completedCount = userConversions.filter(
      (c) => c.status === 'completed'
    ).length

    // Check if stats exist
    const existingStats = await db
      .select()
      .from(userStats)
      .where(eq(userStats.userId, userId))

    if (existingStats.length > 0) {
      // Update existing
      return await db
        .update(userStats)
        .set({
          totalConversions: completedCount,
          lastConversionAt: userConversions[0]?.completedAt,
        })
        .where(eq(userStats.userId, userId))
        .returning()
    } else {
      // Create new
      return await db
        .insert(userStats)
        .values({
          userId,
          totalConversions: completedCount,
          lastConversionAt: userConversions[0]?.completedAt,
        })
        .returning()
    }
  } catch (error) {
    console.error('[v0] Error updating user stats:', error)
    throw error
  }
}

// Get user stats
export async function getUserStats(userId: string) {
  try {
    const stats = await db
      .select()
      .from(userStats)
      .where(eq(userStats.userId, userId))

    return stats[0] || null
  } catch (error) {
    console.error('[v0] Error getting user stats:', error)
    return null
  }
}
